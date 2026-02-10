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

        //prevent double commit/rollback
        let isTransactionCompleted = false;

        //function to commit or not
        const confirmTransaction = async (statusCode) => {

            //prevents double execution
            if(isTransactionCompleted){
                return;
            }

            isTransactionCompleted = true;

            try {
                if (statusCode >= 400) {
                    console.log("ROLLBACK....");
                    await transaction.rollback();
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
                void confirmTransaction(500); //Event listeners do not wait for promises.
            }
        });

        next();
    }
}


//why void -  Fire-and-forget: run transaction commit/rollback in background and intentionally ignore the returned Promise
//res.writableEnded - It becomes true when the response has been completely sent to the client.