import jwt from "jsonwebtoken"

//create token
export const generateToken = (payload) => {
    console.log(process.env.SECRET_KEY);

    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h"
    });
}

//verify token
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}

