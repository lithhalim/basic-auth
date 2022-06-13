const bcrypt = require('bcrypt');
const REGUSTER_MODEL=require("../../model/auth_model/REGUSTER_MODEL")
const createError = require('http-errors')


module.exports=async(req,res,next)=>{
    const{email,password}=req.body;
    try{
        let hashPassword=await bcrypt.hash(password,10);//HASH THE PASSWORD
        let user=await REGUSTER_MODEL.findOne({where:{email:email}});//CHECK IF EMAIL TACKEN
        if(user){res.json({email:"Email Is Taken"});}//RESPONSE THE EMAIL ARE TAKEN
            if(!user){//IF EMAIL IS NOT TACKEN 
                let newRecord=await REGUSTER_MODEL.create({
                    email:email,password:hashPassword
                });
                res.json(newRecord)
                res.status(201)        
            }
    }
    catch(err){res.send(createError.BadRequest())}
}