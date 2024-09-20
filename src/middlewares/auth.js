const adminAuth=(req,res,next)=>{
    console.log("Entered Authorization Middleware");
    const token="xyz";
    const isAdminAuthorized=token==="xyz"
    if(!isAdminAuthorized){
    res.status(401).send("No Access to this url");
    }
    else{
        next();
    }
}


module.exports={
adminAuth
}