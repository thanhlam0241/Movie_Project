FROM python:3.7

WORKDIR /app/kafka_consumer

COPY . /app/kafka_consumer/

RUN pip install -r requirement.txt

CMD ["python", "consumer.py"]