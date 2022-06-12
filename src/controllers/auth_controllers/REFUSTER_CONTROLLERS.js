const bcrypt = require('bcrypt');
const REGUSTER_MODEL=require("../../model/auth_model/REGUSTER_MODEL")

module.exports=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        let usercheck=await REGUSTER_MODEL.findOne({where:{email:email}})
        if(usercheck){res.json({error:"THE EMAIL ARE TAKEN SHODE ANOTHER ONE"})}
        const hashpassword =await bcrypt.hash(password, 10);
        const user = await REGUSTER_MODEL.create({ email:email,password:hashpassword });
        res.status(201)
        res.json(user)
    }catch(err){
    }
    }