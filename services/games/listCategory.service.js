import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';
import cacheService from '../redis/redis.service.js'

class ListGameCategory extends BaseHandler {
  // async list(page, size, sortBy, order) {
  async run() {

    console.log(this.args);
    let {page, size, sortBy, order} = this.args
    const {transaction} = this.context;
    
    //pagination
    let pageNum = 1;
    if (page > 0) {
      pageNum = page;
    }
    let pageSize = 10;
    if (size > 0 && size <= 106) {
      pageSize = size;
    }

    //sorting
    const allowedSortFields = ['id', 'name', 'status', 'orderIndex', 'createdAt'];

    const sortByField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';

    const orderByType = order && order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    //step1 - create cache key'
    const cacheKey = `gameCategories:page:${pageNum}:size:${pageSize}:sortBy:${sortByField}:order:${orderByType}`;

    //step2 - check cache first
    const cacheData = await cacheService.getCache(cacheKey);

    if(cacheData){
      console.log("GameCategories cache HIT");
      return cacheData
    }

    console.log("GameCategories Cache MISS → DB call");

    //step3- fetch from db

    const categories = await db.GameCategories.findAll({
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
      order: [[sortByField, orderByType]],
      include: [
        {
          model: db.User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ],
      transaction
      // order: [["orderIndex", "ASC"]] for reorder to get right order
    });

    //step4 - store in redis 
    await cacheService.setCache(cacheKey, categories, 600);

    return categories;
  }
}

export default ListGameCategory;