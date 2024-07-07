from confluent_kafka import Consumer
import json
from entity import UserBehaviorModel
import os
from log import logger
from dotenv import load_dotenv, dotenv_values 
from mongo import mongoClient
import datetime
# loading variables from .env file
load_dotenv()

def consumeUserBehavior():
    kafkaUrl = os.environ['KAFKA_URL']
    print("Kafka: ", kafkaUrl)
    c = Consumer(
    {
        'bootstrap.servers': kafkaUrl, 'group.id': 'consumer_usr_behavior'
    }
    )
    c.subscribe(['movie-behaviors'])

    print("Connected to kafka topic movie-behaviors succesfully")

    while True:
        msg = c.poll(1.0)
        if msg is None:
            continue
        if msg.error():
            print("Consumer error: {}".format(msg.error()))
            continue
        message = msg.value().decode('utf-8')
        print(message)
        try:
            data = json.loads(message)
            data['timestamp'] = datetime.datetime.now()
            mongoClient.insertAction(data)
        except Exception as ex:
            print("Error in consumer: ", ex)
            logger.logError(
            {
                'message': str(ex),
                'by': 'Kafka consumer'
            })