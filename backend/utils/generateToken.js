import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie= (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie('jwt',token,{
        maxAge:15*24*60*60*1000,//ms
        httpOnly:true,//prevent xss attacks cross-site scripting attacks
        sameSite:"strict", //csrf atacks cross-site request forgery attaks
        secure:process.env.NODE_ENV!=="development"
    })
}

export default generateTokenAndSetCookie;