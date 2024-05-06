# Go to Kafka folder:
```
cd to 'kafka/cluster'
```
# Start the Kafka container:
```
docker-compose up -d  
```

## Verifying the Kafka Cluster
```
docker-compose ps
```
## Creating a Kafka Topic
```
docker-compose exec kafka kafka-topics.sh --create --topic helloworld
  --partitions 1 --replication-factor 1 --bootstrap-server kafka:9092
```
## Publishing and Consuming Messages
```
docker-compose exec kafka kafka-console-consumer.sh --topic helloworld --from-beginning --bootstrap-server kafka:9092
```
Using the above command, we’ll be able to consume all the messages sent over to this topic. 
Additionally, we used –from-beginning to consume all messages sent over the topic from the beginning. 
Let’s also look at publishing the data to this Kafka topic:
```
docker-compose exec kafka kafka-console-producer.sh --topic helloworld --broker-list kafka:9092
```
By using the above command, we can generate and send messages to the 'helloworld' topic. 
Sending messages to Kafka topics using Docker is simple and efficient.

## VERYFY topics
```
docker-compose exec kafka kafka-topics.sh --list --zookeeper zookeeper:2181 
```