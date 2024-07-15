from elasticsearch import Elasticsearch
import os
from dotenv import load_dotenv 
import datetime
# loading variables from .env file
load_dotenv()

elasticSearchURL = os.environ.get('ELASTICSEARCH_URL')
elasticSearchKey = os.environ.get('ELASTICSEARCH_KEY')
elasticPwd = os.environ.get('ES_PASSWORD')
elasticCloudId = os.environ.get('ES_CLOUD_ID')

print("ENV es:", elasticSearchURL, elasticSearchKey, elasticPwd, elasticCloudId)

class Logger:
    def __init__(self) -> None:
        try:
            client = Elasticsearch(
                hosts=elasticSearchURL,
                # cloud_id=elasticCloudId,
                # basic_auth=("elastic", elasticPwd),
                api_key=elasticSearchKey
            )
            client.info()
            self.client = client
        except Exception as ex:
            print("Error while init elasticsearch connector: ", ex)
    def logError(self, doc):
        try:
            print('[START] Start logging: ', doc)
            resp = self.client.index(index="log_error", document={
                "timestamp": str(datetime.datetime.now()),
                "message": str(doc)
            })
            print("Logged! Message: ", resp["result"])
        except Exception as ex:
            print("Error log: ", ex)

logger = Logger()