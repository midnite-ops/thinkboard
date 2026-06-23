import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT

//middleware
app.use(express.json())

app.use("/api/notes", noteRoutes);

connectDb();

app.listen(5001, () => {
  console.log("Server is running on port: 5001:", PORT);
});
