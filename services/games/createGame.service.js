import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';

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


        return db.Games.create({
            name: data.name,
            categoryId: data.categoryId,
            status: data.status,
            createdBy: creatorId,
            orderIndex: lastOrder + 1
        }, { transaction });
    }
}

export default CreateGame;