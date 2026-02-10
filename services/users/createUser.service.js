import db from '../../models/index.js'
import bcrypt from 'bcrypt'
import BaseHandler from '../../utils/baseHandler.js'
import { isPermissionSubset } from '../../helpers/permission.helper.js';

class CreateUserService extends BaseHandler {

    async run() {
        const { creator, data } = this.args;
        const {transaction} = this.context;

        const creatorRole = await db.Role.findByPk(creator.roleId, {transaction});
        if (!creatorRole) {
            throw new Error(`Creator role not found for roleId ${creator.roleId}`);
        }

        const targetRole = await db.Role.findByPk(data.roleId, {transaction});
        if (!targetRole) {
            throw new Error(`Target role not found for roleId ${data.roleId}`);
        }


        if (creatorRole.level >= targetRole.level) {
            const err = new Error('You cannot create this role. You Dont have permission!');
            err.status = 403;
            throw err;
        }

        if (creatorRole.level !== 1 && data.permissions) {
            if (!isPermissionSubset(data.permissions, creator.permissions)) {
                throw {
                    message: 'Cannot assign higher permissions than your own'
                };
            }
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await db.User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            roleId: data.roleId,
            permissions: data.permissions,
            createdBy: creator.id,
        }, {transaction});

        return user;
    }
}

export default CreateUserService;