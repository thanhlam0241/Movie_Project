import sys
sys.path.insert(0, '..')

import numpy as np
import torch
import os
from src.model import RippleNet
from src.config import get_param

class Predict():
    def __init__(self, data_loader, mongoRepo):
        args = get_param()
        self.mongoRepo = mongoRepo
        self.data_loader = data_loader
        n_entity, n_relation = self.data_loader.load_data_kg()
        self.n_entity = n_entity
        self.n_relation = n_relation
        self.model = RippleNet(args, n_entity, n_relation)

    def predict_user(self, user_id):
        try:
            args = get_param()
            data_info = self.data_loader.load_data_user(user_id)
            if data_info is None or len(data_info) == 0:
                return []
            return self.predict(args, data_info, user_id)
        except Exception as ex:
            print(ex)
            return []

    def predict(self, args, data_info, user_id=None):
        ripple_set = data_info
        movie_index_item2entity = self.data_loader.get_movie_dict()
        if movie_index_item2entity is None:
            return []
        top_k = []
        print("[STEP] Init model")
        model = self.model

        if args.use_cuda:
            model.cuda()

        model_save_path = os.path.join(args.model_dir, 'ripplenet.pt')

        if os.path.exists(model_save_path):
            loaded_paras = torch.load(model_save_path, map_location=torch.device('cpu'))
            model.load_state_dict(loaded_paras)  # Tải các tham số mô hình và khởi tạo lại

            model.eval()
            
            print("[STEP] Get items")
            # userid and prepare to recommend movie
            items = self.get_items(user_id, movie_index_item2entity)
            scores = self.get_scores(args, model, items, ripple_set)
            top_k = self.get_top_k(items, scores, 20)
            print(top_k)
            model.train()
        else:
            print('No model saved, please train firstly.')
        return top_k
    
    # get movie relation by id
    def get_movie_id(self):
        return self.mongoRepo.getMovieMapping()

    # Construct the corresponding sequence of triples for userid
    def get_items(self, user_id, movie_index_item2entity):
        # n_movies = len(movie_index_item2entity.keys())
        # print("Number of movie", n_movies)
        item_set = set(movie_index_item2entity.keys())
        entity_set = set()
        n_item = 0
        print("[STEP] Get movie interacted")
        movies_interact = self.mongoRepo.getAllMovieInteracted(user_id)
        for mv in movies_interact:
            item_set.discard(mv)
        for i in item_set:
            if i in movie_index_item2entity.keys():
                entity_set.add(movie_index_item2entity[i])  # Add converted id to collection
                n_item += 1

        items = np.empty((n_item, 3), int)
        # In the triple sequence, the first is userid, which has a 
        # unique value and is determined in the previous step.
        items[:, 0] = user_id
        # The second is item_id, to be precise, it is the entity_id obtained after the item_id is converted, 
        # and it excludes the id that has been rated by this user.
        items[:, 1] = list(entity_set)
        # The last one is label, all set to 0
        items[:, 2] = 0
        return items


    # Feed multi-hop result set
    def get_feed_dict(self, args, data, ripple_set):
        # Similar to the function of the same name in train.py, 
        # the difference is that only a single item is processed here.
        items = torch.LongTensor(data[:, 1])
        labels = torch.LongTensor(data[:, 2])
        memories_h, memories_r, memories_t = [], [], []

        for i in range(args.n_hop):
            memories_h.append(torch.LongTensor([ripple_set[user][i][0] for user in data[:, 0]]))
            memories_r.append(torch.LongTensor([ripple_set[user][i][1] for user in data[:, 0]]))
            memories_t.append(torch.LongTensor([ripple_set[user][i][2] for user in data[:, 0]]))

        if args.use_cuda:
            items = items.cuda()
            labels = labels.cuda()
            memories_h = list(map(lambda x: x.cuda(), memories_h))
            memories_r = list(map(lambda x: x.cuda(), memories_r))
            memories_t = list(map(lambda x: x.cuda(), memories_t))
        return items, labels, memories_h, memories_r, memories_t


    # Get score from model return
    def get_scores(self, args, model, items, ripple_set):  # Get the score of items
        print("Get scores")
        items, labels, memories_h, memories_r, memories_t = self.get_feed_dict(args, items, ripple_set)
        return_dict = model.forward(items, labels, memories_h, memories_r, memories_t)
        scores = return_dict["scores"].detach().cpu().numpy()
        return scores


    # Sort the returned scores and select the movie sequence with the highest score
    def get_top_k(self, items, scores, k):
        print("Get top k")
        index = scores.argsort()[::-1]
        index_k = index[0:k]
        top_k = items[index_k, 1]
        return list(top_k)
