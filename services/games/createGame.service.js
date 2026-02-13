import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';
import cacheService from '../redis/redis.service.js';


class CreateGame extends BaseHandler {
    async run() {
        const { data, creatorId } = this.args
        const { transaction } = this.context;

        if (!data || !creatorId) {
            const err = new Error('Invalid data or creatorId');
            err.status = 400;
            throw err;
        }

        // Check if game already exists
        const existing = await db.Games.findOne({
            where: { name: data.name },
            transaction
        });

        if (existing) {
            const err = new Error('Game already exists');
            err.status = 409; // Conflict
            throw err;
        }

        const lastOrder = await db.Games.max("order_index") || 0;


        const games = await db.Games.create({
            name: data.name,
            categoryId: data.categoryId,
            status: data.status,
            createdBy: creatorId,
            orderIndex: lastOrder + 1
        }, { transaction });

        //delete all games list cache
        const keys = await client.keys("games:*"); //gives all keys that starts with gameCategories
        
        if(keys.length>0){
            cacheService.deleteCache(keys);
            console.log("Game cache cleared !");
        }

        return games;
    }
}

export default CreateGame;