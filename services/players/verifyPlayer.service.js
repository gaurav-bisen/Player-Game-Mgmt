import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';
import { verifyEmailToken } from '../../utils/emailToken.util.js';
import welcomeBonusService from '../bonous/welcomeBonus.service.js';

class verifyEmail extends BaseHandler {
    async verify(token) {

        const { data } = this.args;
        const { transaction } = this.context;

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

        //welcome bonous
        await welcomeBonusService.run(player.id, {transaction});

        await player.save();

        return {
            alreadyVerified: false
        };
    }
}

export default new verifyEmail();