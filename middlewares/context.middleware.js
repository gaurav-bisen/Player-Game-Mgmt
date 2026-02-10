import db from '../models/index.js'

export default function contextMiddleware(transactionStatus = false){
    return async (req, res, next)=> {
        //routes that dont need transaction
        if(!transactionStatus){
            req.context = { transaction: null};
            return next();
        }

        console.log("Transaction Start....");

        let transaction;

        try {
            transaction = await db.sequelize.transaction();
        } catch (error) {
            return next(error)
        }

        //attach context to request
        req.context = {transaction};

        let isTransactionCompleted = false;

        const confirmTransaction = async (statusCode) => {
            if(isTransactionCompleted){
                return;
            }

            isTransactionCompleted = true;

            try {
                if (statusCode >= 400) {
                    console.log("ROLLBACK....");
                    await transaction.rollBack();
                } else {
                    console.log("COMMIT....");
                    await transaction.commit();
                }
            } catch (error) {
                console.log("Transaction Failed : " , error);
            }
        }

        //response finished 
        res.on("finish", () => {
            confirmTransaction(res.statusCode);
        })

        //request aborted
        res.on("close", ()=>{
            if(!res.writableEnded){
                confirmTransaction(500);
            }
        });

        next();
    }
}