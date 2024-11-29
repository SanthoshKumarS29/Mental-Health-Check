import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../model/User.js'


// Registration
export const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        let regData = await User.findOne({ email })

        // if email is already exist or not checking
        if (regData){
            return res.status(400).json({
                message: 'User Mail is already exits'
            })
        }

        // Convert Raw pass to hashed pass
        const hashedPass = await bcrypt.hash(password,10)

        // create a new Data
        regData = new User({ email, password: hashedPass})

        // activation Token
        const token = jwt.sign({regData},process.env.JWT_SECRET,{ expiresIn:'10m'})

        // Save the data
        await regData.save()

        return res.status(201).json({
            message: 'user Successfully registered',
            token: token
        })

    } catch (error) {
        console.error('This is your error:', error); 
        return res.status(500).json({ 
            message: 'Server error. Please try again later.'
        })
    }
}

// Login 

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Find the user email
        const logData = await User.findOne({ email })

        // check user exists
        if(!logData){
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        // Compare the provided pass with hasspass
        const isMatch = await bcrypt.compare(password, logData.password)
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid match'
            })
        }
        
        //Again Generate a jwt token for auth
        const token = jwt.sign({id: logData._id, email: logData.email},process.env.JWT_SECRET, {expiresIn: '1h'})

        return res.status(200).json({
            message:'Login Successfull',
            token:token
            
        })

    } catch (error) {
        console.error('This is your error:', error); 
        return res.status(500).json({ 
            message: 'Server error. Please try again later.' 
        });
    }
}