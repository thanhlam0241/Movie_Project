import os
from typing import List, Callable, Tuple
from Recommender_System.utility.decorator import logger
import re

# Note the path of the ds folder to ensure that the path to the read file is correct when called by other py files.
ds_path = os.path.join(os.path.dirname(__file__), 'ds')


def _read_ml(relative_path: str, separator: str) -> List[Tuple[int, int, int, int]]:
    data = []
    with open(os.path.join(ds_path, relative_path), 'r') as f:
        for line in f.readlines():
            values = line.strip().split(separator)
            user_id, movie_id, rating, timestamp = int(values[0]), int(values[1]), int(values[2]), int(values[3])
            data.append((user_id, movie_id, rating, timestamp))
    return data


def _read_ml100k() -> List[Tuple[int, int, int, int]]:
    return _read_ml('ml-100k/u.data', '\t')


def _read_ml1m() -> List[Tuple[int, int, int, int]]:
    return _read_ml('ml-1m/ratings.dat', '::')


def _read_ml20m() -> List[Tuple[int, int, float, int]]:
    data = []
    with open(os.path.join(ds_path, 'ml-20m/ratings.csv'), 'r') as f:
        for line in f.readlines()[1:]:
            values = line.strip().split(',')
            user_id, movie_id, rating, timestamp = int(values[0]), int(values[1]), float(values[2]), int(values[3])
            data.append((user_id, movie_id, rating, timestamp))
    return data


def _read_lastfm() -> List[Tuple[int, int, int]]:
    data = []
    with open(os.path.join(ds_path, 'lastfm-2k/user_artists.dat'), 'r') as f:
        for line in f.readlines()[1:]:
            values = line.strip().split('\t')
            user_id, artist_id, weight = int(values[0]), int(values[1]), int(values[2])
            data.append((user_id, artist_id, weight))
    return data


def _read_book_crossing() -> List[Tuple[int, str, int]]:
    data = []
    with open(os.path.join(ds_path, 'Book-Crossing/BX-Book-Ratings.csv'), 'r', encoding='utf-8') as f:
        for line in f.readlines()[1:]:
            values = line.strip().split(';')
            user = re.sub(r"\W", "", values[0])
            book = re.sub(r"\W", "", values[1])
            rate = re.sub(r"\W", "", values[2])
            user_id, book_id, rating = int(user), book, int(rate)
            data.append((user_id, book_id, rating))
    return data


@logger('[READ DATA] Start reading data: ', ('data_name', 'expect_length', 'expect_user', 'expect_item'))
def _load_data(read_data_fn: Callable[[], List[tuple]], expect_length: int, expect_user: int, expect_item: int,
               data_name: str) -> List[tuple]:
    data = read_data_fn()
    n_user, n_item = len(set(d[0] for d in data)), len(set(d[1] for d in data))
    print(n_user, n_item)
    assert len(data) == expect_length, data_name + ' length ' + str(len(data)) + ' != ' + str(expect_length)
    assert n_user == expect_user, data_name + ' user ' + str(n_user) + ' != ' + str(expect_user)
    assert n_item == expect_item, data_name + ' item ' + str(n_item) + ' != ' + str(expect_item)
    return data


def ml100k() -> List[Tuple[int, int, int, int]]:
    return _load_data(_read_ml100k, 100000, 943, 1682, 'ml100k')


def ml1m() -> List[Tuple[int, int, int, int]]:
    return _load_data(_read_ml1m, 1000209, 6040, 3706, 'ml1m')


def ml20m() -> List[Tuple[int, int, float, int]]:
    return _load_data(_read_ml20m, 20000263, 138493, 26744, 'ml20m')


def lastfm() -> List[Tuple[int, int, int]]:
    return _load_data(_read_lastfm, 92834, 1892, 17632, 'lastfm')


def book_crossing() -> List[Tuple[int, str, int]]:
    return _load_data(_read_book_crossing, 1149775, 105281, 340239, 'Book-Crossing')


# Test whether the data is read correctly
if __name__ == '__main__':
    data = book_crossing()
