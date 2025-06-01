import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.Redis_URL
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();

export default redisClient;
