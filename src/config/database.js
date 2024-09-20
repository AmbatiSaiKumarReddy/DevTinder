const mongoose=require('mongoose');

const connectDb= async()=>{
    const db=await mongoose.connect('mongodb+srv://ambatisaikumarreddy9:GeorgeMason9@namstenodejs.f0ptm.mongodb.net/devTinder');
}

module.exports={
    connectDb
}



