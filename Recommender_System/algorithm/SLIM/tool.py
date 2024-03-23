from typing import List, Tuple
from Recommender_System.utility.decorator import logger


@logger('Obtain the user-item interaction matrix based on the training set data, ', ('n_user', 'n_item'))
def get_user_item_matrix(n_user: int, n_item: int, train_data: List[Tuple[int, int, int]]) -> List[List[int]]:
    user_item_matrix = [[0 for _ in range(n_item)] for _ in range(n_user)]
    for user_id, item_id, label in train_data:
        user_item_matrix[user_id][item_id] = label
    return user_item_matrix
