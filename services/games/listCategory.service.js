import db from '../../models/index.js'

class ListGameCategory {
  async list(page, size, sortBy, order) {
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

    return db.GameCategories.findAll({
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
      // order: [["orderIndex", "ASC"]] for reorder to get right order
    });
  }
}

export default new ListGameCategory();