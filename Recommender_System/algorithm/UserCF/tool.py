import math
from typing import List
from Recommender_System.utility.decorator import logger


@logger('Start calculating the similarity between each two users ')
def user_similarity(train_data: list, n_user: int, n_item: int) -> List[List[float]]:
    train_item_users = [[] for _ in range(n_item)]  # train_item_users[i] is a list of all users who have had positive feedback on item i
    N = [0 for _ in range(n_user)]  # N[u] is the number of all items for which user u has had positive feedback
    for user_id, item_id, _ in train_data:
        train_item_users[item_id].append(user_id)
        N[user_id] += 1

    # Count the number of common positive feedback items between each two users 
    # and the total number of positive feedback items for each user.
    W = [[0 for _ in range(n_user)] for _ in range(n_user)]  
    # W[u][v] is the number of items with positive feedback for users u and v (v>u）
    for users in train_item_users:
        for u in users:
            for v in users:
                if v > u:
                    W[u][v] += 1
    # Calculate similarity
    for i in range(n_user - 1):
        for j in range(i + 1, n_user):
            if W[i][j] != 0:
                W[i][j] /= math.sqrt(N[i] * N[j])
                W[j][i] = W[i][j]

    return W


@logger('Start calculating the user item rating matrix, ', ('N',))
def user_item_score(train_data: list, n_user: int, n_item: int, W: List[List[float]], N=80) -> List[List[float]]:
    # Get the set of items with positive feedback for each user in the training set
    train_user_items = [set() for _ in range(n_user)]
    for user_id, item_id, _ in train_data:
        train_user_items[user_id].add(item_id)

    scores = [[0 for _ in range(n_item)] for _ in range(n_user)]  # scores[u][i] is user u’s rating of item i
    for user_id in range(n_user):
        Wu = dict()
        for v in range(n_user):
            if W[user_id][v] != 0:
                Wu[v] = W[user_id][v]

        # Calculate the user user_id's interest in each item
        for similar_user_id, similarity_factor in sorted(Wu.items(), key=lambda x: x[1], reverse=True)[:N]:
            for item_id in train_user_items[similar_user_id] - train_user_items[user_id]:
                scores[user_id][item_id] += similarity_factor

    return scores
