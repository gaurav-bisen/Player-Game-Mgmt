import db from '../../models/index.js'

class CreateGameCategory {
    async create(data, creatorId) {
        if (!data || !creatorId) {
            const err = new Error('Invalid data or creatorId');
            err.status = 400;
            throw err;
        }

        // Check if category already exists
        const existing = await db.GameCategories.findOne({
            where: { name: data.name }
        });

        if (existing) {
            const err = new Error('Category already exists');
            err.status = 409; // Conflict
            throw err;
        }

        return db.GameCategories.create({
            name: data.name,
            description: data.description,
            status: data.status,
            createdBy: creatorId
        });
    }
}

export default new CreateGameCategory();