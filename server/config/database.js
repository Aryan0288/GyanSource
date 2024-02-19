const mongoose=require('mongoose');
require('dotenv').config();

exports.dbConnection=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{console.log("db connection successfully")})
    .catch((err)=>{
        console.log("error during db connection");
    })
}
