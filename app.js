
var express = require("express")
var app= express()
var PORT    = process.env.PORT || 8080;
var mongoose= require("mongoose")
var auth = require("./route/auth")
var session = require("express-session")
var index = require("./route/index")
var feeds = require("./route/feeds")

// set ejs
app.set("view engine", "ejs")
// set static files
app.use(express.static("public"))
app.use("css", express.static("public/css"))
// init auth route
app.use(auth)
// init index route
// app.use(index)
// init feeds route
app.use(feeds)

//

const{
    NODE_ENV="development",
    BACKLINK_SESSION = "sessionid",
    SESSION_KEY= "fj73i4959%XkeA>>/!!jf&&%rf"
}=process.env

const IN_PROD = NODE_ENV=="production"
app.use(session({
    name: BACKLINK_SESSION,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_KEY,
    cookie:{
        maxAge:1000*600,
        samSite: true,
        secure: IN_PROD
    }
})) 



mongoose.connect("mongodb://localhost:27017/newdb", { useNewUrlParser: true },(err)=>{
    if(err) throw err
    console.log("dabase connected");
    
})
app.get("/" , (req,res)=>{
   console.log(req.session)
})






 
app.listen(PORT ,(err)=>{
if(err) throw err
console.log(`server strating ${PORT}`);
});