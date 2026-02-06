import db from '../../models/index.js'

class GameCategoryReorder {
    async reorder(categoryIds) {
        
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
                    }
                }
            )
        });

        await Promise.all(reorderCategory);

        return true;
    }



}

export default new GameCategoryReorder();





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