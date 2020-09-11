
var express = require("express")
var app     = express()
var router  = express.Router()
var bodyParser = require("body-parser")
var urlEncoded = bodyParser.urlencoded({extended: true})
var {check , validationResult} = require("express-validator")
var bcrypt = require("bcryptjs")


router.get("/signup" , (req,res)=>{
   res.render("signup")
})
//  signingup route end

// validate Signup

router.post("/signup",urlEncoded, [
                                   check("email")
                                   .trim()
                                   .notEmpty().withMessage("Email can not be empty")
                                   .isEmail().withMessage("Please provide a valid email")
                                   ,
                                   check("fullname")
                                   .notEmpty().withMessage("Fullname can't be empty")
                                   .isLength({min: 6}).withMessage("Name must be at least 6 charactars")
                                   .isLength({max: 20}).withMessage("Name must not exceed 20 characters")

                                   ] ,(req,res)=>{
                                       var errors = validationResult(req)
                                    //    check if there is error
                                    if(errors.isEmpty()){
                                        console.log(req.body);
                                        // hash password for security
                                        bcrypt.hash(req.body.password , 10 , (err,hash)=>{
                                            if(err){
                                                console.error(err);
                                                
                                            }
                                            else{
                                                console.log(hash)
                                            }
                                        })
                                    //    res.json(req.body)
                                       res.redirect("/signin" )
                                       
                                    }
                                    else{
                                        var renderError = errors.mapped()
                                        console.log(renderError.email.msg);
                                        console.log(renderError.fullname.msg);
                                        
                                        console.log(typeof(renderError));
                                        console.log(typeof(renderError));
                                        res.render("signup" ,{email: renderError.email,fullname: renderError.fullname,password1: renderError.password1,password2: renderError.password2 })
                                    }

                                       


})
// validate signup end


//  signing in route
router.get("/signin" , (req,res)=>{
    res.render("signin")
})

module.exports = router