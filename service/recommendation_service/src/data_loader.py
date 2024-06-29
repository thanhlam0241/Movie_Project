import sys
sys.path.insert(0, '..')

import collections
import os
import numpy as np
from src.config import get_param
from src.redis import connectRedis

# Theo kết quả xử lý của tiền xử lý, thu được hai tệp kg_final.txt và rating_final.txt.
# Định dạng tập dữ liệu của KG là triple：h    r   t
# Định dạng tập dữ liệu rating được đề xuất là：userid    itemid  rating

class DataLoader:
    def __init__(self, mongoRepo):
        args = get_param()
        self.redis = connectRedis()
        self.mongoRepo = mongoRepo
        n_entity, n_relation, kg = self.load_kg()
        self.args = args
        self.n_entity = n_entity
        self.n_relation = n_relation
        self.kg = kg
        self.movie_id2entity = self.load_movie_dict()
        print(n_entity, n_relation)
    
    def get_movie_dict(self):
        if self.movie_id2entity is None:
            self.movie_id2entity = self.load_movie_dict()
        print("Get movie dictionary: ", type(self.movie_id2entity))
        return self.movie_id2entity

    def load_movie_dict(self):
        print("Load movie dictionary")
        movie_index_item2entity = dict()
        file = './data/movie_id2entity_id_hash.txt'

        for line in open(file, encoding='utf-8').readlines():
            array = line.strip().split(',')
            movie_index_item2entity[array[0]] = array[1]
        print(len(movie_index_item2entity.keys()))
        return movie_index_item2entity

    def load_data_kg(self):
        try:
            # n_entity = 0
            # n_relation = 0
            # read line 1 and line 2 in file ../data/data_kg.txt
            # with open('../data/data_kg.txt', 'r') as f:
                # n_entity = int(f.readline())
                # n_relation = int(f.readline())
            return self.n_entity, self.n_relation
        except Exception as e:
            print(e)
            return 0, 0

    def load_data_user(self, user_id):
        try:
            print("[STEP: ] Load ripple set")
            user_history = self.mongoRepo.retrieve_topK_user_behaviors(user_id, 10)
            user_history_dict = dict()
            user_history_dict[user_id] = user_history
            ripple_set = self.get_ripple_set(user_history_dict)
            # print(ripple_set)
            return ripple_set
        except Exception as e:
            print(e)
            return None
    
    def construct_kg(self, kg_np):
        print('constructing knowledge graph ...')
        # dict_kg = readFileDict('kg.pkl')
        # if dict_kg is not None:
        #   return dict_kg
        kg = collections.defaultdict(list)
        # defaultdict(<class 'list'>, {head:list([(tail,relation),...])
        # Khi đọc từ điển defaultdict, nếu không tìm thấy thì sẽ trả về giá trị mặc định, []
        for head, relation, tail in kg_np:
            kg[head].append((tail, relation))
            # Cấu trúc cụ thể, thêm các cạnh và nút đuôi của vectơ mối quan hệ vào nút đầu
        # saveFileDict('kg.pkl', kg)
        return kg

    def load_kg(self):
        print('reading KG file ...')

        # Đọc tệp kg
        kg_file = './data/' + 'kg_final'
        if os.path.exists(kg_file + '.npy'):
            kg_np = np.load(kg_file + '.npy')
        else:
            kg_np = np.loadtxt(kg_file + '.txt', delimiter=',',  dtype=np.int32)
            np.save(kg_file + '.npy', kg_np)

        n_entity = len(set(kg_np[:, 0]) | set(kg_np[:, 2]))
        # Hợp nhất tập hợp nút đầu và tập hợp nút đuôi để thu được số lượng thực thể
        n_relation = len(set(kg_np[:, 1]))
        # Tập cạnh có hướng, lấy số lượng quan hệ

        kg = self.construct_kg(kg_np)
        # Xây dựng KG thực sự xây dựng một từ điển đặc biệt
        return n_entity, n_relation, kg

    def load_list_tripple_to_kg(self, lst_tripple):
        try:
            kg = collections.defaultdict(list)
            for tripple in lst_tripple:
                kg[tripple["head"]].append((tripple["tail"], tripple["relation"]))
            return kg
        except Exception as e:
            print(e)
            return None

    # Xây dựng tập kết quả multi-hop ripple
    def get_ripple_set(self, user_history_dict):
        print('constructing ripple set ...')

        # user -> [(hop_0_heads, hop_0_relations, hop_0_tails), (hop_1_heads, hop_1_relations, hop_1_tails), ...]
        ripple_set = collections.defaultdict(list)
        for user in user_history_dict:
            # print("User: ", user)
            for h in range(self.args.n_hop):
                memories_h = []
                memories_r = []
                memories_t = []

                if h == 0:  # The interest is not propagated, and the user history is returned directly as the interest of the previous hop.
                    tails_of_last_hop = user_history_dict[user]
                else:  # spread of interest
                    tails_of_last_hop = ripple_set[user][-1][2]

                # Update triple features accordingly
                for entity in tails_of_last_hop:
                    for tail_and_relation in self.kg[entity]:
                        memories_h.append(entity)
                        memories_r.append(tail_and_relation[1])
                        memories_t.append(tail_and_relation[0])

                # if the current ripple set of the given user is empty, we simply copy the ripple set of the last hop here
                # this won't happen for h = 0, because only the items that appear in the KG have been selected
                if len(memories_h) == 0:
                    ripple_set[user].append(ripple_set[user][-1])
                else:
                    # Sample fixed-size neighbors for each user
                    # Sampling is a compromise that must be made, taking into account computational pressure and noise levels
                    replace = len(memories_h) < self.args.n_memory
                    indices = np.random.choice(len(memories_h), size=self.args.n_memory, replace=replace)
                    memories_h = [memories_h[i] for i in indices]
                    memories_r = [memories_r[i] for i in indices]
                    memories_t = [memories_t[i] for i in indices]
                    ripple_set[user].append((memories_h, memories_r, memories_t))
                    # defaultdict(<class 'list'>, {user:list([(h,r,t),...])
        return ripple_set