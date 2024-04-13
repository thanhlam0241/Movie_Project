from confluent_kafka import Consumer
import pandas as pd

c = Consumer({'bootstrap.servers': '35.196.132.62:6667', 'group.id': 'mygroup'})
c.subscribe(['quickstart-events'])

data = []

for i in range(1000):
    msg = c.poll(1.0)
    if msg is not None:
        data.append(msg.value())

df = pd.DataFrame(data)
print(df.describe())