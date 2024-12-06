import { CheckIn } from "../model/Checkin.js";


// Store the CheckIn Datas
export const storeData = async (req, res) => {
    try {
        const items = new CheckIn(req.body)

        // Validate the schema
        const validationError = items.validateSync();
        if (validationError){
            return res.status(400).json({
                message:'Validation Failed',
                errors: validationError.errors
            })
        }

        await items.save()
        return res.status(201).json({
            message:'Successfuly saved',
        })
    } catch (error) {
        return res.status(400).json({
            message:error.message
        })
        
    }
}