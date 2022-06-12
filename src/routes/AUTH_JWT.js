const express = require('express')
const router = express.Router()



//ALL MEDILWARE FUNCTION ARE USE
const reguster=require("../controllers/auth_controllers/REFUSTER_CONTROLLERS")
const signin=require("../controllers/auth_controllers/SIGNIN_CONTROLLERS")
const signout=require("../controllers/auth_controllers/SIGNOUT_CONTRLLERS")
const allreguster=require("../controllers/auth_controllers/ALLREGESTUR_CONTROLLESR")

//ALL ROUTES ARE USED
router.post("/signup",reguster)
router.post("/signin",signin)
router.post("/signout",signout)
router.get("/allreguster",allreguster)


module.exports=router

