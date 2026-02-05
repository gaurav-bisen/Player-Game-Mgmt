import db from '../../models/index.js'
import { Op } from 'sequelize'

class GameCategoryReorder {
    async reorder(categoryId, newPosition) {
        const category = await db.GameCategories.findByPk(categoryId);

        if (!category) {
            const err = new Error('Category Not Found');
            err.status = 404;
            throw err;
        }

        const currPosition = category.orderIndex;


        if (newPosition == currPosition) {
            return category;
        }

        // moving UP 
        if (newPosition < currPosition) {
            await db.GameCategories.increment(
                { order_index: 1 }, //increase by 1
                {
                    where: {
                        order_index: {
                            [Op.gte]: newPosition,
                            [Op.lt]: currPosition
                        }
                    }
                }
            );
        }

        // moving DOWN 
        if (newPosition > currPosition) {
            await db.GameCategories.decrement(
                { order_index: 1 }, //decrease by 1
                {
                    where: {
                        order_index: {
                            [Op.lte]: newPosition,
                            [Op.gt]: currPosition
                        }
                    }
                }
            );
        }

        // update moved category
        category.orderIndex = newPosition;
        await category.save();

        return category;
    }

}

export default new GameCategoryReorder();