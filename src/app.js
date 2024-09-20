
const express=require('express');
const {connectDb}=require('./config/database');
const User=require('./models/user')



const app=express();
const port=7777;

app.post("/user",async (req,res,next)=>{
    const newUser={
        firstName:"Akshay",
        lastName:"Saini",
        emailId:"akshay@saini.com",
        password:"akshay@123"
    }
    try{
    const user=new User(newUser);
    await user.save();
    res.send("User created successfully")}
    catch(error){
        res.status(400).send("Failed to create user")
    }


})

connectDb().
then(
    ()=>{
        console.log("Db connection successfull");
        app.listen(port,()=>{
            console.log("Server up and Running");
        })

    }
).
catch((error)=>{console.log(error);})





