from kafka import KafkaConsumer

consumer = KafkaConsumer('helloworld')

for msg in consumer:
    print (msg)