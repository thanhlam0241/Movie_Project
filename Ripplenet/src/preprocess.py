import numpy as np
from pathenv import dPath

# Align the id of item\entity
def read_item_index_to_entity_id_file():
    file = '../data/movie/item_index2entity_id_rehashed.txt'
    print('reading item index to entity id file: ' + file + ' ...')
    i = 0
    for line in open(file, encoding='utf-8').readlines():
        item_index = line.strip().split('\t')[0]
        satori_id = line.strip().split('\t')[1]
        item_index_old2new[item_index] = i
        # dict({'item_index':i})
        entity_id2index[satori_id] = i
        # dict({'satori_id':i})
        i += 1


# Convert the rating data and get rating_final.txt: userid itemid rating
def convert_rating():
    file = '../data/movie/ratings.dat'

    print('reading rating file ...')
    item_set = set(item_index_old2new.values())
    # set(i,...)
    user_pos_ratings = dict()  # Positive example
    user_neg_ratings = dict()  # example of failure

    for line in open(file, encoding='utf-8').readlines()[1:]:
        array = line.strip().split(SEP)  # split
        item_index_old = array[1]
        # str(item_index)
        if item_index_old not in item_index_old2new:  # No alignment field, skip
            continue
        item_index = item_index_old2new[item_index_old]  # Convert index, an update of old2new
        # str:(i)
        user_index_old = int(array[0])
        # int(user_index)
        rating = float(array[2])
        # float(rating)
        if rating >= THRESHOLD:  # Use thershold to determine whether the example is positive or not
            if user_index_old not in user_pos_ratings:
                user_pos_ratings[user_index_old] = set()  # Initialize the corresponding collection
            user_pos_ratings[user_index_old].add(item_index)  # expand this collection
            # dict({user_index_old:set({item_index,...}),...})
        else:
            if user_index_old not in user_neg_ratings:
                user_neg_ratings[user_index_old] = set()
            user_neg_ratings[user_index_old].add(item_index)

    print('converting rating file ...')
    writer = open('../data/movie/ratings_final.txt', 'w', encoding='utf-8')
    user_cnt = 0

    for user_index_old, pos_item_set in user_pos_ratings.items():
        if user_index_old not in user_index_old2new:
            user_index_old2new[user_index_old] = user_cnt
            user_cnt += 1
        user_index = user_index_old2new[user_index_old]  # Update transformation user_index

        for item in pos_item_set:
            writer.write('%d\t%d\t1\n' % (user_index, item))
            # user_index    item    1
        unwatched_set = item_set - pos_item_set  # 差集

        # Construct negative examples for subsequent training, verification, and testing:
        # Different from positive examples written from pos_item_set, 
        # negative examples are constructed based on the difference set.
        if user_index_old in user_neg_ratings:
            unwatched_set -= user_neg_ratings[user_index_old]
            # Exclude user records that appear in original negative examples
        # Use the excluded difference set to randomly construct
        # negative examples equal to the positive examples.
        for item in np.random.choice(list(unwatched_set), size=len(pos_item_set), replace=False):
            writer.write('%d\t%d\t0\n' % (user_index, item))

    writer.close()

    writer_too = open('../data/movie/user_index_old2new.txt', 'w', encoding='utf-8')
    for user_index_old, user_index_new in user_index_old2new.items():
        writer_too.write('%d\t%d\n' % (user_index_old, user_index_new))
    writer_too.close()

    print('number of users: %d' % user_cnt)
    print('number of items: %d' % len(item_set))


# Convert kg data and get kg_final.txt: h r t
def convert_kg():
    print('converting kg file ...')

    entity_cnt = len(entity_id2index)
    relation_cnt = 0

    writer = open('../data/movie/kg_final.txt', 'w', encoding='utf-8')

    files = [open('../data/movie/kg_part1_rehashed.txt', encoding='utf-8'),
             open('../data/movie/kg_part2_rehashed.txt', encoding='utf-8')]

    for file in files:
        for line in file:
            array = line.strip().split('\t')
            # Get triple
            head_old = array[0]
            relation_old = array[1]
            tail_old = array[2]

            # Convert to unified id
            if head_old not in entity_id2index:
                entity_id2index[head_old] = entity_cnt
                entity_cnt += 1
            head = entity_id2index[head_old]

            if tail_old not in entity_id2index:
                entity_id2index[tail_old] = entity_cnt
                entity_cnt += 1
            tail = entity_id2index[tail_old]

            if relation_old not in relation_id2index:
                relation_id2index[relation_old] = relation_cnt
                relation_cnt += 1
            relation = relation_id2index[relation_old]

            writer.write('%d\t%d\t%d\n' % (head, relation, tail))

    writer.close()
    print('number of entities (containing items): %d' % entity_cnt)
    print('number of relations: %d' % relation_cnt)

def preprocess():
    # Process the original data set and obtain kg_final.txt and rating.txt files that are easy to use.

    SEP = '::'  # delimiter
    THRESHOLD = 4  # Critical value of positive and negative cases

    entity_id2index = dict()
    relation_id2index = dict()
    item_index_old2new = dict()
    user_index_old2new = dict()

    read_item_index_to_entity_id_file()
    convert_rating()
    convert_kg()

    print('done')
