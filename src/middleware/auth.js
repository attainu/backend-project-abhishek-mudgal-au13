import jwt from 'jsonwebtoken'


//middleware for authorization
const auth = (req, res, next)=>{
    const token = req.header('token')
    if(!token){
        return res.status(401).json({
            msg: "User not authenticated",
            error: [],
            data: {}
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY || `jwt_secret`)
        req.user = decoded.user
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send('Invalid Token')
        
    }
}

export default auth
