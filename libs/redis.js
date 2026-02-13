import { Redis } from 'ioredis'

const connection = new Redis({
    host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null, // REQUIRED by BullMQ
});

export default connection





//redis
// import { createClient } from 'redis'

// const client = createClient({
//     url: process.env.REDIS_URL || 'redis://localhost:6379'
// })

// client.on("connect", ()=>{
//     console.log("Redis Connected !!");
// })

// client.on("error", (err)=> {
//     console.log("Redis error: ", err);
// })

// await client.connect();

// export default client;