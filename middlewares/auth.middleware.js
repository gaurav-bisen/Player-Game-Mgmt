import { verifyToken } from '../utils/jwt.util.js'

export const authenticate = (req, res, next) => {
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
        // console.log("========>>>>decode",decode)

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