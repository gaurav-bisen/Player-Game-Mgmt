import db from '../../models/index.js'

class ListGamesByCategory {
    async list(categoryId) {
        return db.Games.findAll({
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
            order: [['orderIndex', 'ASC']]
        });
    }
}

export default new ListGamesByCategory();