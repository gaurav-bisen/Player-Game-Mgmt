import { generateToken, verifyToken } from './jwt.util.js'

export const generateEmailToken = (player) => {
    return generateToken({
        id: player.id,
        email: player.email,
        purpose: 'email-verify'
    })
}

export const verifyEmailToken = (token) => {
    return verifyToken(token);
}