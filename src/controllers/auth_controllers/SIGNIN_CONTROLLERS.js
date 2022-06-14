const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const REGUSTER_MODEL=require("../../model/auth_model/REGUSTER_MODEL")
const base64 = require('base-64');


module.exports=async (req,res,next)=>{
    //THE CODE COME FROM HEADER ENCODE YOU NEED TO DECODED
    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'KDHKJAHKJDSHJKASHJK']
    let encodedString = basicHeaderParts.pop();  // KDHKJAHKJDSHJKASHJK
    let decodedString = base64.decode(encodedString); // "USERNAME:PASSWORD"
    let [username, password] = decodedString.split(':'); //[USERNAME,PASSWORD]
    try {
      //CHECK THE EMAIL IS CORRECT RO NOT
      const user = await REGUSTER_MODEL.findOne({ where: { email: username } });
      //CHECK IF PASSWORD FROM HEADER MATCH WITH  PASSWORD FROM DATABASE
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        //YOU ADD TOKEN FOR SPECIFIC USER 
        var newToken = jwt.sign({ email:user.email }, process.env.SECRET_ACCES_KEY ,{expiresIn:"15m"});//({ email:user.email }TO SELECT THE USER YOU WONT TO ASSIGN TOKEN TO HIM)
        user.token=newToken;//ADD TOKEN TO THE REGUSTER_MODEL OBJECT TO CAN USE FOR VERIFY
        res.status(200).json(user);
      }
      else {
        throw new Error('EMAIL OR PASSWORD ARE WRONG');
      }
    } catch (error) { res.status(403).send('FAIL TO LOGIN'); }
      
}