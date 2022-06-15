const express = require('express')
const router = express.Router()



//ALL MEDILWARE FUNCTION ARE USE
const reguster=require("../controllers/auth_controllers/REFUSTER_CONTROLLERS")
const signin=require("../controllers/auth_controllers/SIGNIN_CONTROLLERS")
const signout=require("../controllers/auth_controllers/SIGNOUT_CONTRLLERS")
const allreguster=require("../controllers/auth_controllers/ALLREGESTUR_CONTROLLESR")


//BASIQ AUTH REQUIRE
const BASIC_AUTH=require("../auth/BASIC_AUTH")

//ALL ROUTES ARE USED
router.post("/signup",reguster)
router.post("/signin",BASIC_AUTH,signin)
router.post("/signout",signout)
router.get("/allreguster",allreguster)


module.exports=router

