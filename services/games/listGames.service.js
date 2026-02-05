import db from '../../models/index.js'

class ListGames {
    async list() {
        return db.Games.findAll({
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
            order: [["orderIndex","ASC"]]
        });
    }
}

export default new ListGames();