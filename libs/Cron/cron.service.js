import cron from "node-cron";
import { bonusQueue } from '../BullMQ/queues/export.queue.js'

// run every day at 1 AM - 0 1 * * *

export default function startCron() {
    cron.schedule("* * * * *", async () => {
        try {
            console.log("Enqueue daily bonus job");
            await bonusQueue.add("dailyBonusJob", {}); // empty data for now
        } catch (error) {
            console.log("cron error: ", error);
        }
    });
}

