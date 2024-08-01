import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import './db/connection.js';
import postRouter from './routes/post.js'

const app = express();
dotenv.config({path:'./config.env'})

app.use(cors());

app.use(express.json());

app.use('/' , postRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is on ${PORT}`)
})
