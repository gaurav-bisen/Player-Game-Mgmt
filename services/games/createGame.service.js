import db from '../../models/index.js'

class CreateGame{
    async create(data, creatorId){
        if(!data || !creatorId){
            const err = new Error('Invalid data or creatorId');
            err.status = 400;
            throw err;
        }

        // Check if game already exists
        const existing = await db.Games.findOne({
            where: { name: data.name }
        });

        if (existing) {
            const err = new Error('Game already exists');
            err.status = 409; // Conflict
            throw err;
        }
        
        return db.Games.create({
            name: data.name,
            categoryId: data.categoryId,
            status: data.status,
            createdBy: creatorId
        });
    }
}

export default new CreateGame();