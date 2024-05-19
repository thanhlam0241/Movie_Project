import sys
sys.path.insert(0, '..')

import numpy as np
import random
import torch
import os
from src.model import RippleNet


def predict(args, data_info, usr=None):
    n_entity = data_info[3]
    n_relation = data_info[4]
    ripple_set = data_info[5]
    movie_index_item2entity = get_movie_index()
    top_k = []
    movie_top_k = []

    model = RippleNet(args, n_entity, n_relation)

    if args.use_cuda:
        model.cuda()

    model_save_path = os.path.join(args.model_dir, 'ripplenet.pt')

    if os.path.exists(model_save_path):
        loaded_paras = torch.load(model_save_path, map_location=torch.device('cpu'))
        model.load_state_dict(loaded_paras)  # Tải các tham số mô hình và khởi tạo lại

        model.eval()

        user_id, user_id_old = get_user_id(usr)
        # userid and prepare to recommend movie
        items = get_items(user_id, movie_index_item2entity)
        scores = get_scores(args, model, items, ripple_set)
        top_k = get_top_k(items, scores, k=args.k)
        movie_top_k = get_movie_info(top_k, user_id_old)

        model.train()
    else:
        print('No model saved, please train firstly.')
    return top_k, movie_top_k


# get userid
def get_user_id(usr=None):
    user_index_old2new = dict()
    file = '../data/movie/user_index_old2new.txt'
    for line in open(file, encoding='utf-8').readlines():
        user_index_old = line.strip().split('\t')[0]
        user_index_new = line.strip().split('\t')[1]
        user_index_old2new[user_index_old] = user_index_new

    if usr is not None:
        user_id_old = str(usr)
    else:
        user_id_old = random.choice(list(user_index_old2new))
        print('Now, you randomly get a userid：%s.\n' % user_id_old)

    user_id_new = user_index_old2new[user_id_old]
    return int(user_id_new), int(user_id_old)


# get movie relation by id
def get_movie_index():
    movie_index_item2entity = dict()
    file = '../data/movie/item_index2entity_id_rehashed.txt'

    for line in open(file, encoding='utf-8').readlines():
        array = line.strip().split('\t')
        movie_index_item2entity[array[0]] = array[1]

    return movie_index_item2entity


# Return the brief identification information of the movie based on movie_id as the final recommendation result
def get_movie_info(item_list, user_id):
    file = '../data/movie/movies.dat'
    movie_index_id2info = {}

    for line in open(file, encoding='utf-8').readlines():
        array = line.strip().split('::')
        movie_index_id2info[int(array[0])] = list([array[1], array[2]])

    movie_list = []
    for item in item_list:
        if int(item) in movie_index_id2info.keys():
            movie_list.append(movie_index_id2info[int(item)])
            
    print('Now, you get the movies recommend for the user with id:%d.' % user_id)
    for i in range(len(movie_list)):
        print('%d:\t%s\t%s' % (i + 1, movie_list[i][0], movie_list[i][1]))
    return movie_list


# Construct the corresponding sequence of triples for userid
def get_items(user_id, movie_index_item2entity):
    n_item = 0
    n_rating = 0
    n_movies = 3951

    item_set = set(range(1, n_movies))
    entity_set = set()

    file = '../data/movie/ratings.dat'
    for line in open(file, encoding='utf-8').readlines():
        array = line.strip().split('::')
        if int(array[0]) == user_id:  # check
            item_set.discard(int(array[1]))  # Remove the id in question from the candidate set
            n_rating += 1

    for i in item_set:
        if str(i) in movie_index_item2entity.keys():
            entity_set.add(int(movie_index_item2entity[str(i)]))  # Add converted id to collection
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
def get_feed_dict(args, data, ripple_set):
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
def get_scores(args, model, items, ripple_set):  # Get the score of items
    return_dict = model.forward(*get_feed_dict(args, items, ripple_set))
    scores = return_dict["scores"].detach().cpu().numpy()
    return scores


# Sort the returned scores and select the movie sequence with the highest score
def get_top_k(items, scores, k):
    index = scores.argsort()[::-1]
    index_k = index[0:k]
    top_k = items[index_k, 1]
    return list(top_k)
