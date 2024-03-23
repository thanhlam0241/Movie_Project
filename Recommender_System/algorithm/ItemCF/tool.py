import math
from typing import List
from Recommender_System.utility.decorator import logger


@logger('Start calculating the similarity between each two items')
def item_similarity(train_data: list, n_user: int, n_item: int) -> List[List[float]]:
    train_user_items = [[] for _ in range(n_user)]  
    # train_user_items[i] is a list of all items for which user i has had positive feedback
    N = [0 for _ in range(n_item)]  # N[i] is the number of times item i has had positive feedback
    for user_id, item_id, _ in train_data:
        train_user_items[user_id].append(item_id)
        N[item_id] += 1

    W = [[0 for _ in range(n_item)] for _ in range(n_item)]  
    # W[i][j] is the number of positive feedback jointly received by items i and j (j>i）
    for items in train_user_items:
        for i in items:
            for j in items:
                if j > i:
                    W[i][j] += 1

    for i in range(n_item - 1):
        for j in range(i + 1, n_item):
            if W[i][j] != 0:
                W[i][j] /= math.sqrt(N[i] * N[j])
                W[j][i] = W[i][j]

    return W


@logger('开始计算用户物品评分矩阵，', ('N',))
def user_item_score(train_data: list, n_user: int, n_item: int, W: List[List[float]], N=10) -> List[List[float]]:
    # Get the set of items with positive feedback for each user in the training set
    train_user_items = [set() for _ in range(n_user)]
    for user_id, item_id, _ in train_data:
        train_user_items[user_id].add(item_id)

    # Get the set of N items that are most similar to each item
    most_similar_items = []
    for i in range(n_item):
        Wi = dict()  # Wi[j] is the similarity between items i and j
        for j in range(n_item):
            if W[i][j] != 0:
                Wi[j] = W[i][j]
        most_similar_items.append(set(x[0] for x in sorted(Wi.items(), key=lambda x: x[1], reverse=True)[:N]))

    scores = [[0 for _ in range(n_item)] for _ in range(n_user)]  # scores[u][i] is user u’s rating of item i
    for user_id in range(n_user):
        user_item_set = train_user_items[user_id]
        for i in user_item_set:
            for j in most_similar_items[i]:
                if j not in user_item_set:
                    scores[user_id][j] += W[i][j]
        #for i in set(range(n_item)) - user_item_set:
        #    for j in user_item_set & most_similar_items[i]:
        #        scores[user_id][i] += W[i][j]

    return scores
