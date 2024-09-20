
const express=require('express');

const app=express();
const port=7777;


app.use("/",(req,res)=>{
    res.send("Hello Dev")
})
app.use("/wait",(req,res)=>{
    res.send("wait Dev")
})

app.use("/path",(req,res)=>{
    res.send("wait Dev")
})


app.listen(port,()=>{
    console.log("Server up and Running");
})



