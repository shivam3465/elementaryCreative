import mongoose from "mongoose";

const schema=new mongoose.Schema({
    productName:{
        type: String,
        required: true,  
        unique: true      
    },
    productQuantity:{
        type: Number,
        required: true,               
    },
    addedOn:{
        type: Date,
        default: false,        
    },
    addedBy:{
        type: String,
        required: true,       
    },
});

export const Inventory = mongoose.model('inventory',schema);