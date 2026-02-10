import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';

class ListGames extends BaseHandler {
    async run() {
        let { page, size, sortBy, order } = this.args;
        const {transaction} = this.context;

        //pagination
        page = parseInt(page);
        size = parseInt(size);

        let pageNum = 1;
        if (page > 0) {
            pageNum = page;
        }
        let pageSize = 100;
        if (size > 0 && size <= 1000000) {
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
            ],
            transaction
        });
    }
}

export default ListGames;