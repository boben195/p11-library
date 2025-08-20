import express from "express";
import dotenv from "dotenv";
import { connectionDB } from "./config/db.js";
import User from "./models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000

console.log("PORT is ", process.env.PORT);

app.use(cors({origin: "http://localhost:5173", credentials: true})) // credentials: true save token to cookies !DONT FORGET IT IN authStore.js
app.use(express.json());
app.use(cookieParser());

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


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compareSync(
      password,
      userDoc.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //jwt
    if (userDoc) {
      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET,
        { expiresIn: "7d" })


      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
    }

    return res.status(200).json({ user: userDoc, message: "Log in successfully successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

app.get("/api/fatch-user", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token" });
}
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const userDoc = await User.findById(decoded.id).select("-password");
      if (!userDoc) {
        return res.status(400).json({ message: "User not found" });
      }

      res.status(200).json({user: userDoc})
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  
})


app.listen(PORT, async () => {
  await connectionDB()
    console.log("SERVER STARTED AT PORT ", PORT);
    
})