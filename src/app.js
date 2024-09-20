
const express=require('express');
const {adminAuth}=require('./middlewares/auth');

const app=express();
const port=7777;


app.use("/admin/",adminAuth)

//Admin
app.get("/admin/getAdmin",(req,res,next)=>{
    
    
    console.log('Admin Data sent')
    //Error Handling through try catch.
    //Fetch data from database
    try{ 
    throw new Error("Cannot fetch data")
    }
    catch(err){
        res.status(500).send(err);
    }
      res.send("Admin Data Sent")
    
})


app.delete("/admin/deleteAdmin",(req,res,next)=>{
    console.log('Admin deleted')
    res.send("Admin Deleted")

})

//User
app.get("/user",(req,res,next)=>{
    console.log('User Data Logged');
    //Error handle will occur at wild card 
    //Fetch data from database
    throw new Error("Cannot fetch user data");
    res.send("User Data sent");
})

app.use('/',(err,req,res,next)=>{
    console.log('Wild card Middleware')
    console.log(err.message);
    res.status(502).send(err.message);
})

app.listen(port,()=>{
    console.log("Server up and Running");
})



