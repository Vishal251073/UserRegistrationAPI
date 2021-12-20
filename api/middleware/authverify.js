const jwt = require('jsonwebtoken');


module.exports  = (req,res) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const verify = jwt.verify(token,'secret');
    }
    catch(err){
        return res.status(401).json({
            msg:"Invalid Token"
        })
    }
}