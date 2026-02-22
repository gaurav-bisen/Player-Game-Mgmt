import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt.util.js';
import BaseHandler from '../../utils/baseHandler.js'
import cacheService from '../redis/redis.service.js'

class LoginPlayerService extends BaseHandler{
    async run() {
        const {email, password} = this.args;
        const {transaction} = this.context;

        if (!email || !password) {
            throw {
              status: 400,
              message: 'Email and password are required'
            };
          }

        //find player
        const player = await db.players.findOne({
            where: { 
                email
            },
            transaction
        });

        if (!player) {
            const err = new Error('Invalid email or password');
            err.status = 400;
            throw err;
        }

        //compare password
        const isMatch = await bcrypt.compare(password, player.password);
        if (!isMatch) {
            const err = new Error('Invalid email or password');
            err.status = 401;
            throw err;
        }

        //update last login
        await player.update({ lastLoginAt: new Date() });

        // Generate JWT
        const token = generateToken({
            id: player.id,
            email: player.email,
        });

        //store token in redis
        const cacheKey = `loggedInplayer:${player.id}`
        await cacheService.setCache(cacheKey, token, 86400);
        // await cacheService.setLoggedInplayer(player.id, token, );

        return { token, player}
    }
}

export default LoginPlayerService;