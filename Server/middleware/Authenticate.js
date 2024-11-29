import jwt from 'jsonwebtoken';

const Authenticate = (req,res,next) => {
    const token = req.header('token');
    if(!token)
        return res.status(401).json({
            error:"Please sigup or log in first"
    })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            error:'Invalid Token'
        })        
    }
}

export default Authenticate