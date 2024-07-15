from confluent_kafka import Producer
import json

p = Producer({'bootstrap.servers': '127.0.0.1:29092'})
p.produce('movie-behaviors', json.dumps({
    'movie_id': 2,
    'user_id': 6,
    'behavior': 'VIEW'
}))

p.flush()
