import express from "express";
import dotenv from "dotenv";
import { connectionDB } from "./config/db.js";

dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000

console.log("PORT is ", process.env.PORT);


app.use(express.json());

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error("All fields required")
    }
    // const emailExists = 
  } catch (error) {
    console.log(error);
  }
})


app.listen(PORT, async () => {
  await connectionDB()
    console.log("SERVER STARTED AT PORT ", PORT);
    
})