from dataclasses import dataclass
from typing import Tuple, List, Callable, Dict


@dataclass
class TopkData:
    test_user_item_set: dict  # On the test set, each user can participate in the recommended item set
    test_user_positive_item_set: dict  # The set of items each user has behavior on the test set


@dataclass
class TopkStatistic:
    hit: int = 0  # Number of hits
    ru: int = 0  # Number of recommendations
    tu: int = 0  # Number of actions


def topk_evaluate(topk_data: TopkData, score_fn: Callable[[Dict[str, List[int]]], List[float]],
                  ks=[1, 2, 5, 10, 20, 50, 100]) -> Tuple[List[float], List[float]]:
    kv = {k: TopkStatistic() for k in ks}
    for user_id, item_set in topk_data.test_user_item_set.items():
        ui = {'user_id': [user_id] * len(item_set), 'item_id': list(item_set)}
        item_score_list = list(zip(item_set, score_fn(ui)))
        sorted_item_list = [x[0] for x in sorted(item_score_list, key=lambda x: x[1], reverse=True)]

        positive_set = topk_data.test_user_positive_item_set[user_id]
        for k in ks:
            topk_set = set(sorted_item_list[:k])
            kv[k].hit += len(topk_set & positive_set)
            kv[k].ru += len(topk_set)
            kv[k].tu += len(positive_set)
    return [kv[k].hit / kv[k].ru for k in ks], [kv[k].hit / kv[k].tu for k in ks]  # precision, recall
