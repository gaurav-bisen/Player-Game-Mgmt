import client from '../../libs/redis.js';
import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';
import cacheService from '../redis/redis.service.js';


class CreateGameCategory extends BaseHandler {
    async run() {
        const { data, creatorId } = this.args;
        const {transaction} = this.context;
        
        if (!data || !creatorId) {
            const err = new Error('Invalid data or creatorId');
            err.status = 400;
            throw err;
        }

        // Check if category already exists
        const existing = await db.GameCategories.findOne({
            where: { name: data.name },
            transaction
        });

        if (existing) {
            const err = new Error('Category already exists');
            err.status = 409; // Conflict
            throw err;
        }
        
        const lastOrder = await db.GameCategories.max("order_index") || 0;

        const category = await db.GameCategories.create({
            name: data.name,
            description: data.description,
            status: data.status,
            createdBy: creatorId,
            orderIndex: lastOrder+1
        },{
            transaction
        });

        //delete all category list cache
        const keys = await client.keys("gameCategories:*"); //gives all keys that starts with gameCategories
        
        if(keys.length>0){
            cacheService.deleteCache(keys);
            console.log("Game Category cache cleared !");
        }

        return category;
    }
}

export default  CreateGameCategory;