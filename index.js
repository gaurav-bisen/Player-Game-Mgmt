import express from 'express'
import dotenv from "dotenv"
dotenv.config();

import errorHandling from './middlewares/errorHandling.middleware.js';
import userRoute from './routes/user.route.js'
import gameRoute from './routes/game.route.js'
import playerRoute from './routes/player.route.js'
import exportRoute from './routes/export.route.js'
import walletRoute from './routes/wallet.route.js'
import transactionRoute from './routes/transaction.route.js'
import connection from './libs/redis.js';
import startCron from './libs/Cron/cron.service.js'
startCron()
const bullBoardModule = await import("./libs/BullMQ/bullBoard.js");

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 3000;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use('/api/v1/users', userRoute);
app.use('/api/v1/games', gameRoute);
app.use('/api/v1/players', playerRoute);
app.use('/api/v1/wallets', walletRoute);
app.use('/api/v1/transaction', transactionRoute);
app.use('/export', exportRoute);

app.use("/admin/queues", bullBoardModule.bullBoardRouter);



//Error handling middleware
app.use(errorHandling);

//Server running
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Bull Board at http://localhost:8080/admin/queues");
})