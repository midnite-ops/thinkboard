import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from 'dotenv'
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config()

const app = express();
const PORT = process.env.PORT

app.use(cors({
  origin: "http://localhost:5173"
}))
//middleware
app.use(express.json()) //This middleware will parse JSON bodies: req.body

app.use(rateLimiter)


//Our custom middleware
/*app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
})*/

app.use("/api/notes", noteRoutes);

//Always connect to the database before listening for a port

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
})

