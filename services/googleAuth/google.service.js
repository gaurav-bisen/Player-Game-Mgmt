import db from '../../models/index.js'
import { PROVIDER_TYPES } from '../../config/constants.js'
import BaseHandler from '../../utils/baseHandler.js';

class GoogleAuthService extends BaseHandler {
    async run() {
        const { data } = this.args;
        const { transaction } = this.context || {};

        const googleId = data.id;
        const email = data.emails?.[0]?.value || null;

        if (!email) {
            const err = new Error("Google account has no email");
            err.status = 400;
            throw err;
        }

        //finf by googleId
        let player = await db.players.findOne({
            where: {
                googleId
            },
            transaction
        });

        //link by email if exists
        if (!player) {
            player = await db.players.findOne({
                where: {
                    email
                },
                transaction
            });

            if (player) {
                await player.update({
                    googleId,
                    provider: PROVIDER_TYPES.GOOGLE,
                    isVerified: true
                });
            }
        }

        //create new
        if (!player) {
            const usernameBase = (data.displayName || email.split("@")[0])
                .replace(/\s+/g, "")
                .toLowerCase();

            player = await db.players.create({
                username: usernameBase,
                email,
                firstName: data.name?.givenName || null,
                lastName: data.name?.familyName || null,
                googleId,
                provider: PROVIDER_TYPES.GOOGLE,
                isVerified: true
            })
        }

        return player;
    }
}

export default GoogleAuthService