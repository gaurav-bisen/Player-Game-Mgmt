import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt.util.js';

class LoginAuthService {
    async login(email, password) {

        //find user
        const user = await db.User.findOne({
            where: { email },
            include: [{
                model: db.Role,
                as: 'Role',          // match the alias in User model
            }]
        });

        if (!user) {
            const err = new Error('Invalid email or password');
            err.status = 400;
            throw err;
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const err = new Error('Invalid email or password');
            err.status = 401;
            throw err;
        }

        //update last login
        await user.update({ last_login_at: new Date() });

        // Generate JWT
        const token = generateToken({
            id: user.id,
            roleId: user.roleId,
            roleLevel: user.Role.level,
            permissions: user.permissions
        });

        return { token, user }
    }
}

export default new LoginAuthService();