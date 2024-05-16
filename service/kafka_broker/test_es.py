from elasticsearch import Elasticsearch
import json
from datetime import datetime

es_client = Elasticsearch([{'host': 'localhost', 'port': 9200,'scheme': "https"}])

# Verify the connection
if es_client.ping():
    print("Connected to Elasticsearch")
else:
    print("Could not connect to Elasticsearch")

# def logging(message):
#     # index the document
#     obj = json.dumps({
#         'message': message
#     })
#     es_client.index(index='kafka', body=obj)

# doc = {
#     'author': 'author_name',
#     'text': 'Interesting content...',
#     'timestamp': datetime.now(),
# }
# resp = es_client.index(index="test-index", id=1, document=doc)
# print(resp['result'])