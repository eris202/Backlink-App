
var express = require("express")
var app     = express()
var router  = express.Router()
var bodyParser = require("body-parser")
var urlEncoded = bodyParser.urlencoded({extended: true})
var {check , validationResult} = require("express-validator")
var bcrypt = require("bcryptjs")
var users = require("../models/user")



router.get("/signup" , (req,res)=>{
   res.render("signup")
   console.log(req.session)
})
//  signingup route end

// validate Signup

router.post("/signup",urlEncoded, [
                                   check("email")
                                   .trim()
                                   .notEmpty().withMessage("Field can not be empty")
                                   .isEmail().withMessage("Please provide a valid email")
                                   .custom(value =>{
                                       return users.findOne({email: value}).then(user=>{
                                           console.log("hello")
                                           console.log(user)
                                         if(user ==null){
                                            console.log("no user with this email")
                                         }
                                         else{
                                        return Promise.reject("E-mail in use")
                                         }
                                       })
                                   })
                                   ,
                                   check("fullname")
                                   .notEmpty().withMessage("Field can't be empty")
                                   .isLength({min: 6}).withMessage("Name must be at least 6 charactars")
                                   .isLength({max: 20}).withMessage("Name must not exceed 20 characters")  
                                    ,
                                   check("password")
                                   .notEmpty().withMessage("Field can't be empty")
                                   .isLength({min: 6}).withMessage("Password must be at least 6 charactars")
                                   .isLength({max: 20}).withMessage("Password must not exceed 10 characters") 
                                   ,
                                     check('confirm-password')
                                   .notEmpty().withMessage("Field can't be empty")
                                     .custom((value, { req }) => {
                                        if (value !== req.body.password) {
                                        throw new Error('Password confirmation is incorrect');
                                        }
                                    })
                                   ] ,(req,res)=>{

                                       var errors =  validationResult(req);
                                     
                                    if(errors.isEmpty()){

                                        // console.log(req.body);
                                        // hash password for security
                                        bcrypt.hash(req.body.password , 10 , (err,hash)=>{
                                            if(err){
                                                console.error(err);
                                                
                                            }
                                            else{
                                                req.body.password=hash
                                            }
                                           var saveUsers= new users({
                                                name: req.body.fullname,
                                                email: req.body.email,
                                                password: req.body.password
                                            })
                                            saveUsers.save((err)=>{
                                                if(err) throw err
                                                console.log("users save")
                                            })
                                            
                                        })
                                    //    res.json(req.body)
                                       res.redirect("/signin" )
                                    }
                                    else{
                                        var renderError = errors.mapped()
                                        console.log(renderError)
                                        // console.log(renderError.confirm-password)
                                        
                                        console.log(typeof(renderError));
                                        console.log(typeof(renderError));
                                        res.render("signup" ,{
                                            email: renderError.email
                                            ,
                                            fullname: renderError.fullname
                                            ,
                                            password1: renderError.password
                                            ,
                                            // ConfirmPassword: renderError.confirm-password
                                            

                                             })
                                    }

                                       


})
// validate signup end


//  signing in route
router.get("/signin" , (req,res)=>{
    res.render("signin")
})

router.post("/signin",urlEncoded,[
    // check if email exist in database
    check("email")
    .custom(value =>{
                                       return users.find({email: value}).then(user=>{
                                         if(user.length<=0){
                                             return Promise.reject("E-mail not recognize")
                                         }
                                       })
                                   })
                                   ,
                                   // check if email exist in database
     check('password').custom((value, { req }) => {
    if (value !== req.body.passwordConfirmation) {
      throw new Error('Password confirmation is incorrect');
    }
  })
],(req,res)=>{
    var errors =  validationResult(req);
    console.log(errors)
if(errors.isEmpty()){
   res.redirect("/feeds")
}
else{
      var renderError = errors.mapped()
    res.render("signin",{email: renderError.email
                                            ,
                                           
                                            password: renderError.password
                                            
})
}
})

module.exports = router