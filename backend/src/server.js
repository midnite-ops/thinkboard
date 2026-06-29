import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from 'dotenv'
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
import path, { dirname } from 'path'

dotenv.config()

const app = express();
const PORT = process.env.PORT
const __dirname = path.resolve()
console.log(__dirname)

if(process.env.NODE_ENV !== 'production'){
  app.use(cors({
    origin: "http://localhost:5173"
  }))
}

//middleware
app.use(express.json()) //This middleware will parse JSON bodies: req.body

app.use(rateLimiter)


//Our custom middleware
/*app.use((req, res, next) => {
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
})*/

app.use("/api/notes", noteRoutes);

// Serve the React app only in production.
if (process.env.NODE_ENV === "production") {

  // Serve static files (HTML, CSS, JavaScript, images) from the React build folder.
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Return index.html for any route not handled by the backend,
  // allowing React Router to manage client-side navigation.
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

//Always connect to the database before listening for a port

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
})

