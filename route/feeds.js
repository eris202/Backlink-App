
var express = require("express")
var router  = express.Router()


router.get("/feeds" , (req,res)=>{
    res.render("feeds")
})

module.exports = router