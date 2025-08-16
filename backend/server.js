import express from "express";
import dotenv from "dotenv";
import { connectionDB } from "./config/db.js";
import User from "./models/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

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

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({message: "user already exist"})
    }

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({message: "username already exist, try another name"})
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userDoc = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    if (userDoc) {
      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
    }

    return res.status(200).json({user: userDoc, message: "User created successfully"})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})


app.listen(PORT, async () => {
  await connectionDB()
    console.log("SERVER STARTED AT PORT ", PORT);
    
})