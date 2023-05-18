const jwt = require('jsonwebtoken')

const  verifyToken = (req,res, next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json({mssg:'You are not authenticated'})
    }
    jwt.verify(token, "secret_key", (err,user)=>{
        if(err) return res.status(403).json({mssg:'Token not valid'})
        req.user = user;
        next()
        
    })
}

const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id){
            next()
        }
        else{
            return res.status(403).json({mssg:'Token Authorized'})
        }
    })
}

module.exports = {
    verifyToken
}