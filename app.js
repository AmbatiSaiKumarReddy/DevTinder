
const express=require('express');

const app=express();
const port=7777;


//Basically we can use this like for Example:app.use("/route",RouteHandler,[RouteHandler2,RouteHandler3],RouteHandler4,RouteHandler5);

app.use("/user",[(req,res,next)=>{
    console.log("Handler 1");
    //res.send("Response 1");
    next();

},(req,res,next)=>{
    console.log("Handler 2");
    //res.send("Response 2");
    next();
}],
(req,res,next)=>{
    console.log("Handler 3");
    res.send("Response 3");
    //next();
})


app.listen(port,()=>{
    console.log("Server up and Running");
})



