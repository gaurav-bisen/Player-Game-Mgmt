import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';
import cacheService from '../redis/redis.service.js'

class ListGames extends BaseHandler {
    async run() {
        let { page, size, sortBy, order } = this.args;
        const { transaction } = this.context;

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

        //step1 - create cache key
        const cacheKey = `games:page:${pageNum}:size:${pageSize}:sortBy:${sortByField}:order:${orderByType}`;

        //step2 - check cache first
        const cacheData = await cacheService.getCache(cacheKey);

        if (cacheData) {
            console.log("Games cache HIT");
            return cacheData;
        }

        console.log("GameCategories Cache MISS → DB call");

        // step3 - fetch from db
        const games = await db.Games.findAll({

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

        //step4 - store in redis
        await cacheService.setCache(cacheKey, games, 60);

        return games;
    }
}

export default ListGames;