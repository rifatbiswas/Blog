const path = require ("path")
const express = require("express");
const router = require("./routes/router.js")
const app = new express();
const bodyperser = require('body-parser');
require ("dotenv").config();
const user = require("./routes/user.js")

//Secuirity middleware........
const expressratelimit = require('express-rate-limit');
const helmet = require('helmet');
const mongosanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

//Database.....
const mongoose = require ('mongoose');


//Secuirity middleware Implement.........
app.use(cors());
app.use(helmet());
app.use(mongosanitize());
app.use(xss());
app.use(hpp());


//Body perser..
app.use(bodyperser.json())


//Rate Limiter..
const Limiter = expressratelimit.rateLimit({windowMs:15*60*100, max:3000})


//server...
const port = process.env.PORT || 8000;

//Database.....
mongoose
    .set("strictQuery", false)
    .connect(process.env.DATABASE)
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`Server Running on port ${port}`);
            console.log(`Database Connect Success`);
        })
    })
    .catch((err)=> console.log(err.message))



//Managing API Routing.........
app.use("/api/v1",router,user)


// Front-End Tagging...
// app.use(express.static('client-side/dist'))
// app.get("*", (req, res)=>{
//     req.sendFile(path.resolve(__dirname, 'client-side', 'dist', 'index.html'))
// })


module.exports = app;