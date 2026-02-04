import db from '../../models/index.js'
import bcrypt from 'bcrypt'
import { isPermissionSubset } from '../../helpers/permission.helper.js';

class CreateUserService {
    // Helper to check if permission assigned is subset of creator's permission
    // isSubset(assignedPermissions, creatorPermissions) {
    //     return Object.keys(assignedPermissions).every(category =>
    //         creatorPermissions[category] && // does creator have this category?
    //         assignedPermissions[category].every(p => creatorPermissions[category].includes(p))  // every action exists in creator's permissions
    //     );
    // }

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
            throw {
                status: 403,
                message: 'You cannot create this role. You Dont have permission!'
            };
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