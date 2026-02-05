import db from '../../models/index.js'
import bcrypt from 'bcrypt'
import { isPermissionSubset } from '../../helpers/permission.helper.js';

class CreateUserService {

    async createUser(creator, data) {

        const creatorRole = await db.Role.findByPk(creator.roleId);
        if (!creatorRole) {
            throw new Error(`Creator role not found for roleId ${creator.roleId}`);
        }

        const targetRole = await db.Role.findByPk(data.roleId);
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
            createdBy: creator.id
        });

        return user;
    }
}

export default new CreateUserService();