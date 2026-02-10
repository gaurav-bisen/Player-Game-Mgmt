import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';

class reorderGame extends BaseHandler{
    async run(){
        const {gameIds, categoryId} = this.args;

        if (!Array.isArray(gameIds) || gameIds.length === 0) {
            const err = new Error("gameIds array required");
            err.status = 404;
            throw err;
        }

        if (!categoryId) {
            const err = new Error("categoryId required");
            err.status = 404;
            throw err;
        }

        //Verify all games belong to this category
        const games = await db.Games.findAll({
            where: { id: gameIds,  categoryId },
            attributes: ['id','category_id'],
            order: [['orderIndex', 'ASC']]
        });

        // console.log("Games to update:", games.map(g => g.toJSON()));

        if (games.length !== gameIds.length) {
            throw new Error("Some games not found");
        }

        for (let i = 0; i < gameIds.length; i++) {
            await db.Games.update(
              { orderIndex: i + 1 },          
              { where: { 
                id: gameIds[i], 
                category_id: categoryId } }
            );
          }
          
        // const reorderGames = gameIds.map((id, index) => {
        //     return db.Games.update(
        //         {
        //             order_index: index + 1             //arr  0
        //         },
        //         {
        //             where: {
        //                 id ,     //gameid
        //                 categoryId
        //             }
        //         }
        //     )
        // });

        // await Promise.all(reorderGames);

        return true;
    }
}

export default  reorderGame;







// reorder game one by one
// async reorder(gameId, newPosition){
//     const game = await db.Games.findByPk(gameId);

//     if (!game) {
//         const err = new Error('Game Not Found');
//         err.status = 404;
//         throw err;
//     }

//     const currPosition = game.orderIndex;


//     if (newPosition == currPosition) {
//         return game;
//     }

//     // moving UP 
//     if (newPosition < currPosition) {
//         await db.Games.increment(
//             { order_index: 1 }, //increase by 1
//             {
//                 where: {
//                     order_index: {
//                         [Op.gte]: newPosition,
//                         [Op.lt]: currPosition
//                     }
//                 }
//             }
//         );
//     }

//     // moving DOWN 
//     if (newPosition > currPosition) {
//         await db.Games.decrement(
//             { order_index: 1 }, //decrease by 1
//             {
//                 where: {
//                     order_index: {
//                         [Op.lte]: newPosition,
//                         [Op.gt]: currPosition
//                     }
//                 }
//             }
//         );
//     }

//     // update moved category
//     game.orderIndex = newPosition;
//     await game.save();

//     return game;
// }