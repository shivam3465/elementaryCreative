import express from 'express';
import userRouter from './router/user.js';
import inventoryRouter from './router/inventory.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app=express();

// using middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",       
    methods:['GET', 'POST','PUT','DELETE'],
    credentials: true
}))

// routers 
app.use("/api/v1/user",userRouter)
app.use("/api/v1/inventory",inventoryRouter)

export {app};