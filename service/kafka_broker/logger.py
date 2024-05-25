from elasticsearch import Elasticsearch
import json

es = Elasticsearch([
    {'host': 'es-container', 'port': 9200,'scheme': "https"}])

def logging(message):
    # index the document
    obj = json.dumps({
        'message': message
    })
    es.index(index='kafka', body=obj)
