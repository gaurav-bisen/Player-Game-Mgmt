import db from '../../models/index.js'
import { verifyEmailToken } from '../../utils/emailToken.util.js';

class verifyEmail {
    async verify(token) {

        const decoded = verifyEmailToken(token);

        if(decoded.purpose !== 'email-verify') { // extra safety check
            throw {
                status: 400,
                message: 'Invalid token'
            };
        }

        const player = await db.players.findByPk(decoded.id);

        if (!player) {
            throw {
                status: 404,
                message: 'User not found'
              };
        }

        if (player.isVerified) {
            return { alreadyVerified: true }; //sending verified status
        }

        player.isVerified = true;
        await player.save();

        return {
            alreadyVerified: false
        };
    }
}

export default new verifyEmail();