var jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) =>{
    const auth =  req.headers.authorization
    if(!auth){
        return res.status(401).json("Toekn not Found")
    }
    const token = req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(401).json("error","Unauthorized")
    }

    try{
        // verify the jwt token

        const decoded = jwt.verify(token,process.env.SECRET)
        req.userToken = decoded
        next();
    }catch(err){
        console.log(err)
        res.status(401).json({"error": "Invalid token"})
    }
}

// generate token function

const generateToken = (payLoad) => {
    return jwt.sign(payLoad,process.env.SECRET)
}


module.exports = {
    jwtAuthMiddleware,
    generateToken
}