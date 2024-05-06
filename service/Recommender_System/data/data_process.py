import os
import random
import numpy as np
from typing import Tuple, List, Callable
from collections import defaultdict
from Recommender_System.utility.evaluation import TopkData
from Recommender_System.utility.decorator import logger


@logger('[COLLECT] Start collecting negative samples: ', ('ratio', 'threshold', 'method'))
def negative_sample(data: List[tuple], ratio=1, threshold=0, method='random') -> List[tuple]:
    """
    Collect negative samples
    It ensures that every user has a positive sample, but it does not guarantee that 
    every item has a positive sample, which may reduce the number of users and items.

    :param data: The original data has at least three columns. 
    The first column is the user ID, the second column is the item ID, and the third column is the weight.
    :param ratio: Negative and positive sample ratio
    :param threshold: Weight threshold. A weight greater than or equal to this value is a positive sample. 
    A weight less than this value is neither a positive sample nor a negative sample.
    :param method: Collection method, random means uniform random collection, popular means random collection based on popularity
    :return: Data set with negative samples
    """
    # Negative sample collection weight
    if method == 'random':
        negative_sample_weight = {d[1]: 1 for d in data}
    elif method == 'popular':
        negative_sample_weight = {d[1]: 0 for d in data}
        for d in data:
            negative_sample_weight[d[1]] += 1
    else:
        raise ValueError("Parameter method must be 'random' or 'popular'")

    # Get the set of positive samples and non-positive samples for each user
    user_positive_set, user_unpositive_set = defaultdict(set), defaultdict(set)
    for d in data:
        user_id, item_id, weight = d[0], d[1], d[2]
        (user_positive_set if weight >= threshold else user_unpositive_set)[user_id].add(item_id)

    # Collect negative samples only for users with positive samples
    user_list = list(user_positive_set.keys())
    arg_positive_set = [user_positive_set[user_id] for user_id in user_list]
    arg_unpositive_set = [user_unpositive_set[user_id] for user_id in user_list]
    from concurrent.futures import ProcessPoolExecutor
    with ProcessPoolExecutor(max_workers=os.cpu_count()//2, initializer=_negative_sample_init, initargs=(ratio, negative_sample_weight)) as executor:
        sampled_negative_items = executor.map(_negative_sample, arg_positive_set, arg_unpositive_set, chunksize=100)

    # Build a new dataset
    new_data = []
    for user_id, negative_items in zip(user_list, sampled_negative_items):
        new_data.extend([(user_id, item_id, 0) for item_id in negative_items])
    for user_id, positive_items in user_positive_set.items():
        new_data.extend([(user_id, item_id, 1) for item_id in positive_items])
    return new_data


def _negative_sample_init(_ratio, _negative_sample_weight):  # Used to initialize global variables for child processes
    global item_set, ratio, negative_sample_weight
    item_set, ratio, negative_sample_weight = set(_negative_sample_weight.keys()),  _ratio, _negative_sample_weight


def _negative_sample(positive_set, unpositive_set):  # Negative sampling of individual users
    valid_negative_list = list(item_set - positive_set - unpositive_set)  # A list of item IDs that can be used as negative samples
    n_negative_sample = min(int(len(positive_set) * ratio), len(valid_negative_list))  # Number of negative samples collected
    if n_negative_sample <= 0:
        return []

    weights = np.array([negative_sample_weight[item_id] for item_id in valid_negative_list], dtype=np.float64)
    weights /= weights.sum()  # Negative sample collection weight

    # Collect n_negative_sample negative samples (sampling by subscript is to prevent the item id type from changing from int or str to np.int or np.str)
    sample_indices = np.random.choice(range(len(valid_negative_list)), n_negative_sample, False, weights)
    return [valid_negative_list[i] for i in sample_indices]


@logger('[Regularize] Start id regularization: ')
def neaten_id(data: List[tuple]) -> Tuple[List[Tuple[int, int, int]], int, int, dict, dict]:
    """
    Regularize the user ID and item ID of the data so that the ID starts from 0 and ends with the quantity minus 1.

    :param data: The original data has three columns. The first column is the user ID, 
    the second column is the item ID, and the third column is the label.
    :return: New data, number of users, number of items, old to new user id mapping, old to new item id mapping
    """
    new_data = []
    n_user, n_item = 0, 0
    user_id_old2new, item_id_old2new = {}, {}
    for user_id_old, item_id_old, label in data:
        if user_id_old not in user_id_old2new:
            user_id_old2new[user_id_old] = n_user
            n_user += 1
        if item_id_old not in item_id_old2new:
            item_id_old2new[item_id_old] = n_item
            n_item += 1
        new_data.append((user_id_old2new[user_id_old], item_id_old2new[item_id_old], label))
    return new_data, n_user, n_item, user_id_old2new, item_id_old2new


@logger('[SEGMENT] Start data segmentation: ', ('test_ratio', 'shuffle', 'ensure_positive'))
def split(data: List[tuple], test_ratio=0.4, shuffle=True, ensure_positive=False) -> Tuple[List[tuple], List[tuple]]:
    """
    Split the data into training set data and test set data

    :param data: Original data, the first column is user id, the second column is item id, and the third column is label.
    :param test_ratio: The proportion of test set data, this value is between 0 and 1
    :param shuffle: Whether to randomly sort the original data
    :param ensure_positive: Whether to ensure that each user in the training set has positive examples
    :return: Training set data and test set data
    """
    if shuffle:
        random.shuffle(data)
    n_test = int(len(data) * test_ratio)
    test_data, train_data = data[:n_test], data[n_test:]

    if ensure_positive:
        user_set = {d[0] for d in data} - {user_id for user_id, _, label in train_data if label == 1}
        if len(user_set) > 0:
            print('Warning: To ensure that the training set data has positive examples for each user,%d(%f%%)Data is randomly inserted into the training set from the test set'
                  % (len(user_set), 100 * len(user_set) / len(data)))

        i = len(test_data) - 1
        while len(user_set) > 0:
            assert i >= 0, 'There is no way to ensure that every user in the training set has a positive example, because there are users without positive examples:' + str(user_set)
            if test_data[i][0] in user_set and test_data[i][2] == 1:
                user_set.remove(test_data[i][0])
                train_data.insert(random.randint(0, len(train_data)), test_data.pop(i))
            i -= 1

    return train_data, test_data


@logger('[PREPARE] Start preparing topk evaluation data: ', ('n_sample_user',))
def prepare_topk(train_data: List[Tuple[int, int, int]], test_data: List[Tuple[int, int, int]],
                 n_user: int, n_item: int, n_sample_user=None) -> TopkData:
    """
    Prepare data for topk evaluation

    :param train_data: The training set data has three columns, namely user_id., item_id, label
    :param test_data: The test set data has three columns, namely user_id., item_id, label
    :param n_user: amount of users
    :param n_item: number of the stuffs
    :param n_sample_user: The number of users to sample. If it is None, it means sampling all users.
    :return: The data used for topk evaluation is of type TopkData, which includes each user's 
    (recommended item set) and (behavioral item set) in the test set.
    """
    if n_sample_user is None or n_sample_user > n_user:
        n_sample_user = n_user

    user_set = np.random.choice(range(n_user), n_sample_user, False)

    def get_user_item_set(data: List[Tuple[int, int, int]], only_positive=False):
        user_item_set = {user_id: set() for user_id in user_set}
        for user_id, item_id, label in data:
            if user_id in user_set and (not only_positive or label == 1):
                user_item_set[user_id].add(item_id)
        return user_item_set

    test_user_item_set = {user_id: set(range(n_item)) - item_set
                          for user_id, item_set in get_user_item_set(train_data).items()}
    test_user_positive_item_set = get_user_item_set(test_data, only_positive=True)
    return TopkData(test_user_item_set, test_user_positive_item_set)


def pack(data_loader_fn: Callable[[], List[tuple]],
         negative_sample_ratio=1, negative_sample_threshold=0, negative_sample_method='random',
         split_test_ratio=0.4, shuffle_before_split=True, split_ensure_positive=False,
         topk_sample_user=300) -> Tuple[int, int, List[Tuple[int, int, int]], List[Tuple[int, int, int]], TopkData]:
    """
    Read data, negative sampling, split training set and test set, prepare TopK evaluation data

    :param data_loader_fn: Read data function in data_loader
    :param negative_sample_ratio: The proportion of negative and positive samples, 0 means no sampling
    :param negative_sample_threshold: The weight threshold of negative sampling. A weight greater than or equal to this value is a positive sample. 
    A weight less than this value is neither a positive sample nor a negative sample.
    :param negative_sample_method: Negative sampling method, value is 'random' or 'popular'
    :param split_test_ratio: The proportion of the test set when splitting, this value is between 0 and 1
    :param shuffle_before_split: Whether to randomize the order of the data set before splitting
    :param split_ensure_positive: Whether to ensure that each user in the training set has positive examples when segmenting
    :param topk_sample_user: The number of user samples used to calculate the TopK indicator. If it is None, it means sampling all users.
    :return: Number of users, number of items, training set, test set, used for TopK evaluation data
    """
    data = data_loader_fn()
    if negative_sample_ratio > 0:
        data = negative_sample(data, negative_sample_ratio, negative_sample_threshold, negative_sample_method)
    else:
        data = [(d[0], d[1], 1) for d in data]  # Become implicit feedback data
    data, n_user, n_item, _, _ = neaten_id(data)
    train_data, test_data = split(data, split_test_ratio, shuffle_before_split, split_ensure_positive)
    topk_data = prepare_topk(train_data, test_data, n_user, n_item, topk_sample_user)
    return n_user, n_item, train_data, test_data, topk_data


def pack_kg(kg_loader_config: Tuple[str, Callable[[], List[tuple]], type], keep_all_head=True,
            negative_sample_ratio=1, negative_sample_threshold=0, negative_sample_method='random',
            split_test_ratio=0.4, shuffle_before_split=True, split_ensure_positive=False,
            topk_sample_user=100) -> Tuple[int, int, int, int, List[Tuple[int, int, int]],
                                           List[Tuple[int, int, int]], List[Tuple[int, int, int]], TopkData]:
    """
    Jointly read the data and knowledge graph, segment the training set and test set, and prepare TopK evaluation data

    :param kg_loader_config: Reading knowledge graph configuration in kg_loader
    :param keep_all_head: If it is False, when reading the knowledge graph structure, 
    the deleted head entity does not have a triplet corresponding to the item in the data set.
    :param negative_sample_ratio: The proportion of negative and positive samples, 0 means no sampling
    :param negative_sample_threshold: The weight threshold of negative sampling. A weight greater than or equal to this value is a positive sample. 
    A weight less than this value is neither a positive sample nor a negative sample.
    :param negative_sample_method: Negative sampling method, value is 'random' or 'popular'
    :param split_test_ratio: The proportion of the test set when splitting, this value is between 0 and 1
    :param shuffle_before_split: Whether to randomize the order of the data set before splitting
    :param split_ensure_positive: Whether to ensure that each user in the training set has positive examples when segmenting
    :param topk_sample_user: The number of user samples used to calculate the TopK indicator. If it is None, it means sampling all users.
    :return: Number of users, number of items, number of entities, number of relationships, 
    training set, test set, knowledge graph, used for TopK evaluation data
    """
    from Recommender_System.data.kg_loader import _read_data_with_kg
    data, kg, n_user, n_item, n_entity, n_relation = _read_data_with_kg(
        kg_loader_config, negative_sample_ratio, negative_sample_threshold, negative_sample_method, keep_all_head)
    train_data, test_data = split(data, split_test_ratio, shuffle_before_split, split_ensure_positive)
    topk_data = prepare_topk(train_data, test_data, n_user, n_item, topk_sample_user)
    return n_user, n_item, n_entity, n_relation, train_data, test_data, kg, topk_data
