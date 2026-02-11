import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';
import cacheService from '../redis/redis.service.js';
import client from '../../libs/redis.js';

class GameCategoryReorder extends BaseHandler {
    async run() {
        const {categoryIds} = this.args;
        const {transaction} = this.context;
        
        if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
            const err = new Error("categoryIds array required");
            err.status = 400;
            throw err;
        }

        // for (let i = 0; i < categoryIds.length; i++) {
        //     const id = categoryIds[i];
      
        //     await db.GameCategories.update(
        //       { orderIndex: i + 1 },
        //       { where: { id } }
        //     );
        //   }

        const reorderCategory = categoryIds.map((id, index) => {
            return db.GameCategories.update(
                {
                    orderIndex: index + 1             //arr  0
                },
                {
                    where: {
                        id          //categoryid
                    },
                    transaction
                }
            )
        });

        await Promise.all(reorderCategory);

        //delete all category list cache
        const keys = await client.keys("gameCategories:*"); //gives all keys that starts with gameCategories
        
        if(keys.length>0){
            cacheService.deleteCache(keys);
            console.log("Game Category cache cleared !");
        }


        return true;
    }
}

export default  GameCategoryReorder;





//reorder one by one
// async reorder(categoryId, newPosition) {
//     const category = await db.GameCategories.findByPk(categoryId);

//     if (!category) {
//         const err = new Error('Category Not Found');
//         err.status = 404;
//         throw err;
//     }

//     const currPosition = category.orderIndex;


//     if (newPosition == currPosition) {
//         return category;
//     }

//     // moving UP
//     if (newPosition < currPosition) {
//         await db.GameCategories.increment(
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
//         await db.GameCategories.decrement(
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
//     category.orderIndex = newPosition;
//     await category.save();

//     return category;
// }