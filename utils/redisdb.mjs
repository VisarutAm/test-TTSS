import { createClient } from "redis";

const redisClient = createClient({
    
  url: process.env.Redis_URL
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect();

export default redisClient;

// import { createClient } from "redis"

// const redisClient = createClient ({
//   url : process.env.Redis_URL
// });

// redisClient.on("error", function(err) {
//   throw err;
// });
// await redisClient.connect()
// await redisClient.set('foo','bar');

// export default redisClient;