// import express from "express";
// import { connectionDB } from "./config/db.js";



// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// // fix __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.join(__dirname, "../.env") });


// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());


// app.get("/", (req, res) => {
//     res.send("Hello world")
// })


// app.listen(PORT, async () => {
//     await connectionDB();

//     console.log("Server started at PORT: ", PORT);
    
// })

import express from "express";
import { connectionDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to .env (one level above backend/)
const envPath = path.join(__dirname, "../.env");
console.log("🔍 Looking for .env at:", envPath);

// Load .env file
dotenv.config({ path: envPath });

// Validate environment variables
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env file");
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, async () => {
    await connectionDB();
    console.log(`✅ Server started at PORT: ${PORT}`);
});