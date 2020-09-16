var express = require("express")


const{
    NODE_ENV="development",
    SESSION_NAME = "sessionID",
    SESSION_KEY= "fj73i4959%X*s,vbks00keAA)>>/!d!jf&&%rf"
}=process.env

const IN_PROD = NODE_ENV=="production"

module.exports= secrete = {
     NODE_ENV,
    SESSION_NAME,
    SESSION_KEY
}




