import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';

class ListGamesByCategory extends BaseHandler {
    async run() {
        const {categoryId, page, size, sortBy, order} = this.args;
        const {transaction} = this.context;
        
        //pagination
        let pageNum = 1;
        if (page > 0) {
            pageNum = page;
        }
        let pageSize = 10;
        if (size > 0 && size <= 5000000) {
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
            transaction
        });
    }
}

export default  ListGamesByCategory;