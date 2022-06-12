const REGUSTER_MODEL=require("../../model/auth_model/REGUSTER_MODEL")

module.exports=async(req,res)=>{
    let user=await REGUSTER_MODEL.findAll()
    res.json(user)
}