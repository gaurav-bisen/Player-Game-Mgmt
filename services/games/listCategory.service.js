import db from '../../models/index.js'

class ListGameCategory{
    async list(){
        return db.GameCategories.findAll({
            include: [
                {
                  model: db.User,
                  as: 'creator',
                  attributes: ['id', 'name']
                }
              ]
        });
    }
}

export default new ListGameCategory();