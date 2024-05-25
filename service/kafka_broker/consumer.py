from confluent_kafka import Consumer
import certifi
from logger import logging
import json 



if __name__ == '__main__':
    c = Consumer(
    {
        'bootstrap.servers': 'localhost:9092', 'group.id': 'testtopic'
    }
)
    c.subscribe(['movie-behaviors'])

    while True:
        msg = c.poll(1.0)
    
        if msg is None:
            continue
        if msg.error():
            print("Consumer error: {}".format(msg.error()))
            continue
        print('[START] Start logging: ')
        try:
            logging(msg)
        except ex as Exception:
            print(ex.message)
        
        print('Received message: {}'.format(msg.value().decode('utf-8')))
    
    c.close()