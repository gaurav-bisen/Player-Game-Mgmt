import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';

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

        return db.GameCategories.create({
            name: data.name,
            description: data.description,
            status: data.status,
            createdBy: creatorId,
            orderIndex: lastOrder+1
        },{
            transaction
        });
    }
}

export default  CreateGameCategory;