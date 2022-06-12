const bcrypt = require('bcrypt');
const REGUSTER_MODEL=require("../../model/auth_model/REGUSTER_MODEL")

module.exports=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const hashpassword =await bcrypt.hash(password, 10);
        const user = await REGUSTER_MODEL.create({ email:email,password:hashpassword });
        res.json(user)
    }catch(err){
    }
    }