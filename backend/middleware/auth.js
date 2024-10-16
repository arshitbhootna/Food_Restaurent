// when user send some data , then it is used to authenticate the token

import jwt from 'jsonwebtoken'

 const authMiddleware = async (req,res,next)=>{

    const {token} = req.headers;
    if(!token) return res.json({success: false , message: "Not authorized"})
    try {
        // we decoded that token to get back Our ID .
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();

    } catch (error) {
        console.log(error);
        res.json({success: false , message : "error in middleware"});
    }    

}
export default authMiddleware; 