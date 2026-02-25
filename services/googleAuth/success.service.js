import BaseHandler from "../../utils/baseHandler.js";
import { generateToken } from "../../utils/jwt.util.js";

class GoogleSuccessService extends BaseHandler {
    async run() {
        const { user } = this.args;
        const { transaction } = this.context;

        if (!user) {
            throw { status: 401, message: "Google authentication failed" };
        }

        const token = generateToken({ id: user.id });

        return {
            message: "Google login success",
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                provider: user.provider,
            },
        }
    }
}

export default GoogleSuccessService