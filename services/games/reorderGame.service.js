import db from '../../models/index.js'
import { Op } from 'sequelize'

class reorderGame{
    async reorder(gameId, newPosition){
        const game = await db.Games.findByPk(gameId);

        if (!game) {
            const err = new Error('Game Not Found');
            err.status = 404;
            throw err;
        }

        const currPosition = game.orderIndex;


        if (newPosition == currPosition) {
            return game;
        }

        // moving UP 
        if (newPosition < currPosition) {
            await db.Games.increment(
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
            await db.Games.decrement(
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
        game.orderIndex = newPosition;
        await game.save();

        return game;
    }
}

export default new reorderGame();