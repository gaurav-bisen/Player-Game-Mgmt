import express from 'express'
import dotenv from "dotenv"
import http from 'http'
import passport from 'passport';
dotenv.config();

import errorHandling from './middlewares/errorHandling.middleware.js';
import userRoute from './routes/user.route.js'
import gameRoute from './routes/game.route.js'
import playerRoute from './routes/player.route.js'
import exportRoute from './routes/export.route.js'
import walletRoute from './routes/wallet.route.js'
import transactionRoute from './routes/transaction.route.js'
import stripeRoute from './routes/stripe.route.js'
import connection from './libs/redis.js';
import startCron from './libs/Cron/cron.service.js'
import { initSocket } from './libs/Socket/socket.js'
startCron()
const bullBoardModule = await import("./libs/BullMQ/bullBoard.js");
import { initGooglePassport } from './libs/passport/google.passport.js';
initGooglePassport();

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 3000;

//MIDDLEWARES
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString() // Only required for Stripe or similar services
    }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(passport.initialize());

//ROUTES
app.use('/api/v1/users', userRoute);
app.use('/api/v1/games', gameRoute);
app.use('/api/v1/players', playerRoute);
app.use('/api/v1/wallets', walletRoute);
app.use('/api/v1/transaction', transactionRoute);
app.use('/api/v1/stripe', stripeRoute);
app.use('/export', exportRoute);

app.use("/admin/queues", bullBoardModule.bullBoardRouter);



//Error handling middleware
app.use(errorHandling);

//Server running
const server = http.createServer(app);

//initialize socket 
initSocket(server);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Bull Board at http://localhost:8080/admin/queues");
    console.log("Server running with Socket IO");
})