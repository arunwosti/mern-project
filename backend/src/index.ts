import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute"

 mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string) 
 .then(()=> console.log("Connected to database"));


const app = express();
app.use(express.json());
app.use(cors())

// defining end point i.e when we receive the request to the api(/api/my/user) the following line will run
app.use("/api/my/user", myUserRoute);

app.listen(7000, ()=>{
    console.log("Server started on localhost:7000");
})
