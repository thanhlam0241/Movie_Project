import sys
sys.path.insert(0, '..')

from typing import Optional, List
from bson.objectid import ObjectId
from pymongo import MongoClient
from src.entity import MovieMappingModel, MovieMappingCollection, UserBehavior

class MongoDb:
    def __init__(self):
        self.client = MongoClient("localhost", 27017)

        self.database = self.client.movie_warehouse

        self.user_behavior_collection = self.database.user_behavior

        self.movie_mapping_collection = self.database.movie_mapping

    def getMovieMapping(self) -> dict:
        try:
            movie_mapping = self.movie_mapping_collection.find()
            dict_movie = dict()
            for item in movie_mapping:
                dict_movie[item['movie_id']] = item['entity_id']
            return dict_movie
        except Exception as e:
            print(e)
            return None

    def getAllMovieInteracted(self, user_id):
        try:
            user_behaviors = self.user_behavior_collection.find({"user_id": user_id})
            return [behavior['movie_id'] for behavior in user_behaviors]
        except Exception as e:
            print(e)
            return None

    def getMovieIdByEntityId(self, entity_id: int):
        try:
            movie_mapping = self.movie_mapping_collection.find_one({"entity_id": entity_id})
            return movie_mapping['movie_id']
        except Exception as e:
            print(e)
            return None

    def user_behavior_helper(self, behavior) -> dict:
        try:
            return {
                "user_id": behavior["user_id"],
                "movie_id": behavior["movie_id"]
            }
        except Exception as e:
            print(e)
            return None

    # Retrieve all user_behaviors present in the database
    def retrieve_user_behaviors(self):
        try:
            user_behaviors = self.user_behavior_collection.find()
            return user_behaviors
        except Exception as e:
            print(e)
            return None

    def retrieve_topK_user_behaviors(self, user_id: int, top_k: int = 10) -> list:
        try:
            list = []
            user_behaviors = self.user_behavior_collection.find({"user_id": user_id}).sort("timestamp").limit(top_k)
            for behave in user_behaviors:
                list.append(behave['movie_id'])
            return list
        except Exception as e:
            print(e)
            return None