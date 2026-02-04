import db from '../../models/index.js'

class GetAllUserService{
    async getAllUsers(roleId){
        const where = roleId ? { roleId } : {};

        const users = await db.User.findAndCountAll({
            where,
            include: [{ model: db.Role }] //Also fetch the user’s role
          });
      
          return users;
    }
}

export default new GetAllUserService();
