
export function validateAJV (ajvValidate){
    return (req, res, next) => {
        const valid = ajvValidate(req.body);

        if(!valid){
            const err = ajvValidate.errors;

            res.status(400).json({
                message: " Validation failed!! ", err
            })
        }
        next();
    }
}