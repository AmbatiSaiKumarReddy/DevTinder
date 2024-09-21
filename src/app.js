
const express=require('express');
const {connectDb}=require('./config/database');
const User=require('./models/user')



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

//Inserting Data
app.post("/user",async (req,res,next)=>{
    console.log(req.body);
    
    try{
    const user=new User(req.body);
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
    await User.findByIdAndUpdate(user_id,data)
   
    res.send("User Updated Successfully");

    }
    catch(error){
        res.status(500).send("User Update Failed");
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





