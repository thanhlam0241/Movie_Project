from pymongo import MongoClient
from entity import UserBehaviorModel
import os
from log import logger
from dotenv import load_dotenv, dotenv_values 
# loading variables from .env file
load_dotenv()

class MongoConnector: 
    def __init__(self):
        try:
            mongoUrl = os.environ['MONGODB_URL']
            print("Mongo: ", mongoUrl)
            client = MongoClient(mongoUrl, 27017)
            client.server_info()
            self.client = client
            self.database = self.client.movie_warehouse
            print("Connected to mongodb succesfully")
        except Exception as ex:
            logger.logError(ex)
    
    def insertAction(self, behavior):
        try:
            result = self.database.user_behavior.insert_one(behavior)
            print("Insert successfully! Value: ", result)
        except Exception as ex:
            logger.logError({
                "message": str(ex),
                "by": "mongo insert action"
            })
mongoClient = MongoConnector()