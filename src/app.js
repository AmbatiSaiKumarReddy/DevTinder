
const express=require('express');
const {connectDb}=require('./config/database');
const User=require('./models/user')
const bcrypt=require('bcrypt');
const { validateSignupData } = require('./utils/validations');


const app=express();
const port=7777;

app.use(express.json())

//Get User By EmailId
app.get("/user",async(req,res,)=>{

    try{
        const user=await User.findOne({emailId:req.body.emailId});
        res.send(user)
    }
    catch(error){
        res.send(500).send("Error fetching data")
    }

})

//Login
app.post("/login",async(req,res)=>{

    const {emailId,password}=req.body;

    try{
        const user=await User.findOne({emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        
        const isPasswordValid=await bcrypt.compare(password,user.password)
        console.log(isPasswordValid)
        if(!isPasswordValid){
            throw new Error("Invalid Credentials")
        }
        else{
            res.send("Login Successful")
        }


    }
    catch(error){

        res.status(400).send(error.message)
    }


})

//Feed Api- Get All Users from Database

app.get("/feed",async(req,res,)=>{

    try{
        const user=await User.find({});
        console.log(user)
        res.send(user)
    }
    catch(error){
        res.send(500).send("Error fetching data")
    }

})

//Inserting Data(Creating a User)
app.post("/signup",async (req,res,next)=>{
    
    const {firstName,lastName,emailId,password,gender,skills}=req.body;
    
    
    
    
    
    try{

    validateSignupData(req);
    //Encrypt the password
    const hashPassword=await bcrypt.hash(password,10)
    const user=new User({
        firstName,
        lastName,
        emailId,
        password:hashPassword,
        gender,
        skills
    });
    await user.save();
    res.send("User created successfully")}
    catch(error){
        console.log(error.message)
        res.status(400).send("Failed to create user"+"-"+error.message)
    }


})

//Update Data of a user Using Patch
app.patch("/user",async (req,res)=>{

    const data=req.body;
    const {user_id}=data;

    try{

    //You cannot update email and age once a user is created
    const ALLOWED_UPDATES=["photoUrl","about","gender","skills","user_id"]
    const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))

    if(!isUpdateAllowed){
        throw new Error("Update not Allowed")
    }
    await User.findByIdAndUpdate(user_id,data)
   
    res.send("User Updated Successfully");

    }
    catch(error){
        res.status(500).send("User Update Failed"+"-"+error.message);
    }

    
    
})



//Delete a User from database
app.delete("/user",async (req,res)=>{
    try{
    const {user_id}=req.body
    const user=await User.findOneAndDelete(user_id)
    console.log(data);
    res.send("User Deleted Successfully")
 }
 catch(error){

    res.send("Cannot Delete")
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





