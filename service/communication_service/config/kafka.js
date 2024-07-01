const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["127.0.0.1:29092"],
});

// const consumer = kafka.consumer({ groupId: "test-group" });
const producer = kafka.producer();

const sendMessage = async (topic, message) => {
  try {
    // Producing
    await producer.connect();
    await producer.send({
      topic: topic ?? "movie-behaviors",
      messages: [
        {
          value: JSON.stringify({
            user_id: 5,
            movie_id: 1424,
            action: "VIEW",
          }),
        },
      ],
    });
    await producer.disconnect();
  } catch (ex) {
    console.log(ex);
  }

  // Consuming
  //   await consumer.connect();
  //   await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  //   await consumer.run({
  //     eachMessage: async ({ topic, partition, message }) => {
  //       console.log({
  //         partition,
  //         offset: message.offset,
  //         value: message.value.toString(),
  //       });
  //     },
  //   });
};

module.exports = {
  sendMessage,
};
