require('dotenv').config();
const jwt = require('jsonwebtoken');
const REGUSTER_MODEL=require("../model/auth_model/REGUSTER_MODEL")
const createError = require('http-errors')


module.exports = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
    //GET THE JWT TOKEN FROM HERE
    var token = req.headers.authorization.split(' ')[1];
    //CHECK ON THE TOKEN KEY USE TO REPLAVE FROM JWT TO ORIGINAL KODE
    const parsedToken = jwt.verify(token, process.env.SECRET_ACCES_KEY)
    const user =await REGUSTER_MODEL.findOne({where:{email:parsedToken.email}}).then((data)=>{
      req.user=data.dataValues
      next()
    })
    }
  } catch (e) {
    res.json(createError.Unauthorized());
  }
}

