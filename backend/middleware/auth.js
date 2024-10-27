// when user send some data , then it is used to authenticate the token

import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    console.log('checking for user presence');
    const { storedtoken } = req.headers;
    if (!storedtoken) {
        console.log("Token not available");
        return res.json({ success: false, message: "Not }authorized" })
    }
    else {
        console.log("Token available . checking for authentication");
    }
    try {
        // we decoded that token to get back Our ID .
        const token_decode = jwt.verify(storedtoken, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error in middleware" });
    }

}
export default authMiddleware; 