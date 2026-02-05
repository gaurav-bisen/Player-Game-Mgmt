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
            order: [['createdAt', 'DESC']]
        });
    }
}

export default new ListGamesByCategory();