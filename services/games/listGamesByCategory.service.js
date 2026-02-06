import db from '../../models/index.js'

class ListGamesByCategory {
    async list(categoryId, page, size, sortBy, order) {
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
        const allowedSortFields = ['id', 'name', 'status', 'orderIndex', 'createdAt'];

        const sortByField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

        const orderByType = order && order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

        return db.Games.findAll({
            limit: pageSize,
            offset: (pageNum - 1) * pageSize,
            order: [[sortByField, orderByType]],

            where: {
                categoryId
            },
            include: [
                {
                    model: db.GameCategories,
                    attributes: ['id', 'name']
                },
                {
                    model: db.User,
                    as: 'creator',
                    attributes: ['id', 'name']
                }
            ],
        });
    }
}

export default new ListGamesByCategory();