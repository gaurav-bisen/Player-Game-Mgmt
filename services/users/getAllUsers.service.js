import db from '../../models/index.js'

class GetAllUserService{
    async getAllUsers(roleId){
        const where = roleId ? { roleId } : {}; //if roleid not provided extract all users

        const users = await db.User.findAndCountAll({
            where,
            include: [{ 
                model: db.Role ,
                as: 'Role'
            }] //Also fetch the user’s role
          });
      
          return users;
    }
}

export default new GetAllUserService();
