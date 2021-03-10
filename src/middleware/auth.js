import jwt from 'jsonwebtoken'

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
        const decoded = jwt.verify(token, 'jwt_secret')
        req.user = decoded.user
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send('Invalid Token')
        
    }
}

export default auth