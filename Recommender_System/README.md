# Recommender-System

A developing recommender system, implements in tensorflow 2.

Dataset: MovieLens-100k, MovieLens-1m, MovieLens-20m, lastfm, Book-Crossing, and some satori knowledge graph.

Algorithm: UserCF, ItemCF, LFM, SLIM, GMF, MLP, NeuMF, FM, DeepFM, MKR, RippleNet, KGCN and so on.

Evaluation: ctr's auc f1 and topk's precision recall.

## Requirements

* Python 3.8
* Tensorflow 2.3.2

## Run

Open parent directory of current file as project in PyCharm, set up Python 3.8 interpreter and pip install tensorflow==2.3.2.

Go to Recommender_System/algorithm/xxx/main.py and run.

MovieLens-20m is too large to upload. If you need it, [download](http://files.grouplens.org/datasets/movielens/ml-20m.zip) and put 'ml-20m' under 'Recommender_System/data/ds' folder.

---

# Recommender-System

This is a recommendation system under development based on tensorflow2.

Dataset: Movies MovieLens-100k, MovieLens-1m, MovieLens-20m，music lastfm，Book-Crossing，And some satori knowledge graphs.

Algorithm: UserCF (user-based collaborative filtering), ItemCF (item-based collaborative filtering), LFM, SLIM, GMF, MLP, NeuMF, FM, DeepFM, MKR, RippleNet, KGCN.

Evaluation indicators: auc and f1 of click rate prediction ctr, accuracy precision and recall rate of topk evaluation.

## Require

* Python 3.8
* Tensorflow 2.3.2

## Run

Open the parent folder of this file as a project in IDE, set up the Python 3.8 environment and use pip to install version 2.3.2 of tensorflow.

Go to Recommender_System/algorithm/xxx/main.py source code file and click Run.

MovieLens-The 20m dataset is too large and therefore not included in this project file. If you need this dataset,[MovieLens-20m](http://files.grouplens.org/datasets/movielens/ml-20m.zip) and will 'ml-20m' folder into 'Recommender_System/data/ds' under contents.
