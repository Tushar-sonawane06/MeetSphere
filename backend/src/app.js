import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {connectToSocket} from "./controllers/socketManager.js";

import userRoutes from "./routes/userRoutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

dotenv.config();

app.set("port",(process.env.PORT || 8000));

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));

app.use("/api/v1/users", userRoutes);

app.get("/",(req,res)=>{
    console.log("server is working");
})

const start = async ()=> {
    const connectionDb = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`db is connected ${connectionDb.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log("Listening on port 8000");
    })
}

start();