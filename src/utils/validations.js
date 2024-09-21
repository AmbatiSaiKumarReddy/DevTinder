const validator=require('validator')

const validateSignupData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body

    if(!firstName || !lastName){
        throw new Error("Api Level Name is not valid")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Api Level Email is not valid")

    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Api Level Enter Strong Password")
    }

}

module.exports={
    validateSignupData
}
