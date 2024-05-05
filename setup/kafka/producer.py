from confluent_kafka import Producer, Consumer

p = Producer({'bootstrap.servers': '35.196.132.62:9002'})
p.produce('quickstart-events', 'my message')

p.flush()
