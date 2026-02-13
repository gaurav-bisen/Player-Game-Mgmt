import { Queue } from 'bullmq'
import connection from '../../redis.js'

//queue name - exportCSV
export const exportQueue = new Queue("exportCSV", {
    connection
});