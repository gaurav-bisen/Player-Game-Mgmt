// import { Redis } from 'ioredis'

// const client = new Redis();

// export default client





//redis
import { createClient } from 'redis'

const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
})

client.on("connect", ()=>{
    console.log("Redis Connected !!");
})

client.on("error", (err)=> {
    console.log("Redis error: ", err);
})

await client.connect();

export default client;