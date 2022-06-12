const express = require('express')
const app = express()


const  bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())




//----------------------------------------------ROUTES SECTION------------------------------------------//
const AUTH_ROUTER=require("../routes/AUTH_JWT")
app.use(AUTH_ROUTER)
app.get('/', (req, res) => {
  res.send('Hello World!')
})




const LITH_DATABASE=require("../database/LITH_DATABASE")
async function start(PORT){// WHE MUST RUN DATABASE CONNECTION BEFORE LISTEN TO SERVER
app.listen(PORT, async() => {
    try {
        await LITH_DATABASE.authenticate();
        await LITH_DATABASE.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }      
  console.log(`Example app listening on port ${PORT}`)
})
}


module.exports ={
    app: app,
    start: start,
}
