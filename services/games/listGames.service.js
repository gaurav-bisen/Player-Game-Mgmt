import db from '../../models/index.js'

class ListGames {
    async list(page, size, sortBy, order) {

        //pagination
        page = parseInt(page);
        size = parseInt(size);

        let pageNum = 1;
        if (page > 0) {
            pageNum = page;
        }
        let pageSize = 10;
        if (size > 0 && size <= 15) {
            pageSize = size;
        }

        //sorting
        const allowedSortFields = ['id', 'name', 'categoryId', 'status', 'orderIndex', 'createdAt'];

        const sortByField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

        const orderByType = order && order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

        return db.Games.findAll({

            limit: pageSize,
            offset: (pageNum - 1) * pageSize,
            order: [[sortByField, orderByType]],

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
            ]

        });
    }
}

export default new ListGames();