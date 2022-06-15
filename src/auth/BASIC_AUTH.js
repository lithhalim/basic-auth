const base64 = require('base-64');
const REGUSTER_MODEL=require("../model/auth_model/REGUSTER_MODEL")
const bcrypt = require('bcrypt');



module.exports=async (req,res,next)=>{
    //----------------------------------DECODED THE CODE ---------------------------------------------//
        //req.headers.authorization=Basic bGl0aDoxMjM
        //THE CODE COME FROM HEADER ENCODE YOU NEED TO DECODED
        let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'KDHKJAHKJDSHJKASHJK']
        let encodedString = basicHeaderParts.pop();  // KDHKJAHKJDSHJKASHJK
        let decodedString = base64.decode(encodedString); // "USERNAME:PASSWORD"
        let [username, password] = decodedString.split(':'); //[USERNAME,PASSWORD]



        try{
            //CHECK THE EMAIL IS CORRECT RO NOT
            const user = await REGUSTER_MODEL.findOne({ where: { email: username } });
            //CHECK IF PASSWORD FROM HEADER MATCH WITH  PASSWORD FROM DATABASE
            const valid = await bcrypt.compare(password, user.password);
            if(valid){
            //IF THE EMAIL AND PASSWORD ARE CORRECT GO TO NEXT STEP
            req.userses=user
            next()
            }
            else{
                throw new Error('EMAIL OR PASSWORD ARE WRONG');
            }


        }
        catch (error) { 
            res.status(403).send('FAIL TO LOGIN'); 
        }

}