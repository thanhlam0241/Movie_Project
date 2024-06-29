import { createClient } from "redis";

function createRedisClient() {
  const client = createClient({
    username: "movieredis",
    password: "Hoatuyet_0241",
    socket: {
      host: "redis-11146.c299.asia-northeast1-1.gce.redns.redis-cloud.com",
      port: 11146,
    },
  });
  client
    .connect()
    .then(() => {
      console.log("Connect to redis successfully");
    })
    .catch((e) => console.log(e));
  return client;
}

const redisClient = createRedisClient();

export default redisClient;
