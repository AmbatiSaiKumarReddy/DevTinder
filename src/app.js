
const express=require('express');
const {adminAuth}=require('./middlewares/auth');

const app=express();
const port=7777;


app.use("/admin/",adminAuth)

//Admin
app.get("/admin/getAdmin",(req,res,next)=>{
    
    
    console.log('Admin Data sent')
    res.send("Admin Data Sent")
    
})

app.delete("/admin/deleteAdmin",(req,res,next)=>{
    console.log('Admin deleted')
    res.send("Admin Deleted")

})

//User
app.get("/user",(req,res,next)=>{
    console.log('User Data Logged');
    res.send("User Data sent");
})

app.listen(port,()=>{
    console.log("Server up and Running");
})



