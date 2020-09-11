
var express = require("express")
var app     = express()
var mongoose= require("mongoose")
var PORT    = process.env.PORT || 1000
var indexRoute = require("./route/index")
var auth = require("./route/auth")
var feeds = require("./route/feeds")
// setting static files

app.use(express.static("public"))
app.use("/css", express.static(__dirname + "/public/css"))
app.use("/js", express.static(__dirname + "/public/js"))

console.log(__dirname + "/public/css")
// set template engine
app.set("view engine" , "ejs")

// init index route
app.use("/", indexRoute)  
// init  feeds route
app.use(feeds)        

// init auth

app.use(auth)

// var mongoDBUrl= "mongodb://localhost:27017/newDatabase"

// mongoose.connect(mongoDBUrl,(err)=>{
// if(err) throw err
// console.log("dtabase connected")


// })

app.listen(PORT ,(err)=>{
if(err) throw err
console.log(`App started on port ${PORT}`)
})