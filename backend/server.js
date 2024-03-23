import { app } from "./app.js";
import { config } from "dotenv";
import { connectDB } from "./data/database.js";


config({
    path:"./data/config.env"
})


connectDB();

app.get('/',(req,res)=>{
    res.json({success:true,message:"home page loaded"});
})

const {PORT}=process.env;
app.listen(PORT,()=>{
    console.log('server listening on port ',PORT);
})