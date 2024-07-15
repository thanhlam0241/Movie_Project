import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["127.0.0.1:29092"],
});

const producer = kafka.producer();

interface MessageBehavior {
  user_id: number;
  movie_id: number;
  behavior: string;
}

export const sendMessage = async (topic: string, message: MessageBehavior) => {
  try {
    // Producing
    await producer.connect();
    await producer.send({
      topic: topic ?? "movie-behaviors",
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
    await producer.disconnect();
  } catch (ex) {
    console.log(ex);
  } finally {
    console.log("Send message");
  }
};
