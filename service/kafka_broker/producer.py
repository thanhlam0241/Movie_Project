from confluent_kafka import Producer, Consumer

p = Producer({'bootstrap.servers': 'localhost:9092'})
p.produce('movie-behaviors', 'Hello World')

p.flush()
