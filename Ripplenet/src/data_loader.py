import collections
import os
import numpy as np

# Theo kết quả xử lý của tiền xử lý, thu được hai tệp kg_final.txt và rating_final.txt.
# Định dạng tập dữ liệu của KG là triple：h    r   t
# Định dạng tập dữ liệu rating được đề xuất là：userid    itemid  rating


def load_data(args):
    train_data, eval_data, test_data, user_history_dict = load_rating(args)
    n_entity, n_relation, kg = load_kg(args)
    ripple_set = get_ripple_set(args, kg, user_history_dict)
    return train_data, eval_data, test_data, n_entity, n_relation, ripple_set


def load_rating(args):
    print('reading rating file ...')

    # Đọc file tập dữ liệu rating
    rating_file = '../data/' + args.dataset + '/ratings_final'
    if os.path.exists(rating_file + '.npy'):
        rating_np = np.load(rating_file + '.npy')
    else:
        rating_np = np.loadtxt(rating_file + '.txt', dtype=np.int32)
        np.save(rating_file + '.npy', rating_np)

    # n_user = len(set(rating_np[:, 0]))
    # n_item = len(set(rating_np[:, 1]))
    return dataset_split(rating_np)  # 分割数据集


def dataset_split(rating_np):
    print('splitting dataset ...')

    # chia tỷ lệ：train:eval:test = 6:2:2
    eval_ratio = 0.2
    test_ratio = 0.2
    n_ratings = rating_np.shape[0]

    # Chọn ngẫu nhiên tập dữ liệu
    eval_indices = np.random.choice(n_ratings, size=int(n_ratings * eval_ratio), replace=False)
    left = set(range(n_ratings)) - set(eval_indices)
    test_indices = np.random.choice(list(left), size=int(n_ratings * test_ratio), replace=False)
    train_indices = list(left - set(test_indices))
    # print(len(train_indices), len(eval_indices), len(test_indices))

    # Duyệt qua tập dữ liệu train và chỉ giữ lại những người dùng có xếp hạng lịch sử
    user_history_dict = dict()
    for i in train_indices:
        user = rating_np[i][0]
        item = rating_np[i][1]
        rating = rating_np[i][2]
        if rating == 1:
            if user not in user_history_dict:
                user_history_dict[user] = []
            user_history_dict[user].append(item)
            # Thêm lịch sử tương ứng

    train_indices = [i for i in train_indices if rating_np[i][0] in user_history_dict]
    eval_indices = [i for i in eval_indices if rating_np[i][0] in user_history_dict]
    test_indices = [i for i in test_indices if rating_np[i][0] in user_history_dict]
    # print(len(train_indices), len(eval_indices), len(test_indices))

    train_data = rating_np[train_indices]
    eval_data = rating_np[eval_indices]
    test_data = rating_np[test_indices]

    return train_data, eval_data, test_data, user_history_dict


def load_kg(args):
    print('reading KG file ...')

    # Đọc tệp kg
    kg_file = '../data/' + args.dataset + '/kg_final'
    if os.path.exists(kg_file + '.npy'):
        kg_np = np.load(kg_file + '.npy')
    else:
        kg_np = np.loadtxt(kg_file + '.txt', dtype=np.int32)
        np.save(kg_file + '.npy', kg_np)

    n_entity = len(set(kg_np[:, 0]) | set(kg_np[:, 2]))
    # Hợp nhất tập hợp nút đầu và tập hợp nút đuôi để thu được số lượng thực thể
    n_relation = len(set(kg_np[:, 1]))
    # Tập cạnh có hướng, lấy số lượng quan hệ

    kg = construct_kg(kg_np)
    # Xây dựng KG thực sự xây dựng một từ điển đặc biệt
    return n_entity, n_relation, kg


def construct_kg(kg_np):
    print('constructing knowledge graph ...')
    kg = collections.defaultdict(list)
    # defaultdict(<class 'list'>, {head:list([(tail,relation),...])
    # defaultdict而非dict，注意二者区别：
    # Khi đọc từ điển defaultdict, nếu không tìm thấy thì sẽ trả về giá trị mặc định, []
    for head, relation, tail in kg_np:
        kg[head].append((tail, relation))
        # Cấu trúc cụ thể, thêm các cạnh và nút đuôi của vectơ mối quan hệ vào nút đầu
    return kg


# Xây dựng tập kết quả multi-hop ripple
def get_ripple_set(self, args, kg, user_history_dict):
    print('constructing ripple set ...')

    # user -> [(hop_0_heads, hop_0_relations, hop_0_tails), (hop_1_heads, hop_1_relations, hop_1_tails), ...]
    ripple_set = collections.defaultdict(list)

    for user in user_history_dict:  
        for h in range(args.n_hop):  
            memories_h = []
            memories_r = []
            memories_t = []

            if h == 0:  # The interest is not propagated, and the user history is returned directly as the interest of the previous hop.
                tails_of_last_hop = user_history_dict[user]
            else:  # spread of interest
                tails_of_last_hop = ripple_set[user][-1][2]

            # Update triple features accordingly
            for entity in tails_of_last_hop:
                for tail_and_relation in kg[entity]:
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
                replace = len(memories_h) < args.n_memory
                indices = np.random.choice(len(memories_h), size=args.n_memory, replace=replace)
                memories_h = [memories_h[i] for i in indices]
                memories_r = [memories_r[i] for i in indices]
                memories_t = [memories_t[i] for i in indices]
                ripple_set[user].append((memories_h, memories_r, memories_t))
                # defaultdict(<class 'list'>, {user:list([(h,r,t),...])
    return ripple_set
