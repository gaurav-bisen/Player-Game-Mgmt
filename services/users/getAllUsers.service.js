import db from '../../models/index.js'

class GetAllUserService {
    async getAllUsers(roleId, page, size,sortBy, order) {
        const where = roleId ? { roleId } : {}; //if roleid not provided extract all users

        //pagination
        let pageNum = 1;
        if (page > 0) {
            pageNum = page;
        }
        let pageSize = 10;
        if (size > 0 && size <= 15) {
            pageSize = size;
        }

        //sorting
        const allowedSortFields = ['id', 'name', 'email', 'roleId', 'lastLoginAt', 'createdAt'];

        const sortByField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

        const orderByType = order && order.toLowerCase()==='asc' ? 'ASC' : 'DESC';


        const users = await db.User.findAndCountAll({
            limit: pageSize,
            offset: (pageNum - 1) * pageSize,
            order: [[sortByField, orderByType]],
            where,
            include: [{
                model: db.Role,
                as: 'Role'
            }] //Also fetch the user’s role
        });

        return users;
    }
}

export default new GetAllUserService();
