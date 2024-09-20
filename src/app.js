
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


app.post("/user",async (req,res,next)=>{
    console.log(req.body);
    
    try{
    const user=new User(req.body);
    await user.save();
    res.send("User created successfully")}
    catch(error){
        console.log(error.message)
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





