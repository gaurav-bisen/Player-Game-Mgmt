import bcrypt from 'bcrypt'
import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';

class CreatePlayerService extends BaseHandler {
    async run() {

        const { data } = this.args;
        const { transaction } = this.context;

        if (!data || Object.keys(data).length === 0) {
            const err = new Error("Request body cannot be empty");
            err.status = 400;
            throw err;
        }
        if (!data.username) {
            const err = new Error("Username is required");
            err.status = 404;
            throw err;
        }

        if (!data.email || !data.password) {
            const err = new Error("Email and password are required");
            err.status = 404;
            throw err;
        }

        const existingUser = await db.players.findOne({
            where: { email: data.email }
        });

        if (existingUser) {
            throw {
                status: 409,
                message: 'User already exists'
            };
        }

        const hashPassword = await bcrypt.hash(data.password, 10);

        return await db.players.create({
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            phoneNumber: data.phoneNumber,
            isVerified: false,
            password: hashPassword,
        }, { transaction });
    }
}

export default CreatePlayerService;
