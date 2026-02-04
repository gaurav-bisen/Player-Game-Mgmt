import express from 'express'
import dotenv from "dotenv"
dotenv.config();

import errorHandling from '../SEQUELIZE/middlewares/errorHandling.middleware.js';
import userRoute from './routes/user.route.js'
import gameRoute from './routes/game.route.js'

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 3000;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use('/api/v1/users', userRoute);
app.use('/api/v1/games', gameRoute);

//Error handling middleware
app.use(errorHandling);

//Server running
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})