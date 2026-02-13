import { verifyToken } from '../utils/jwt.util.js'
import cacheService from '../services/redis/redis.service.js'

export const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // if (!authHeader || !authHeader.startsWith("Bearer")) {
    //     return res.status(401).json({
    //         message: "Authorization token missing or invalid"
    //     });
    // }
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or invalid" });
    }
    

    try {
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied!!" })
        }

        const decode = verifyToken(token);

        //1.get token from redis
        const cacheKey = `loggedInUser:${decode.id}`
        const redisToken = await cacheService.getCache(cacheKey);
        // const redisToken = await cacheService.getLoggedInUser(decode.id);

        //2.compare token
        if(!redisToken || redisToken !== token){
            return res.status(401).json({ message: "Session expired. Logged in from another device!!" })
        }

        //token in body
        //req.body.token = token;

        req.user = decode;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token is not valid"
        });
    }
}