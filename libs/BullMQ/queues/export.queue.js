import { Queue } from 'bullmq'
import connection from '../../redis.js'

export const exportQueue = new Queue("exportCSV", {
    connection
});