import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try backend/.env first, otherwise fallback to project root
dotenv.config({
  path: path.join(__dirname, ".env"), // backend/.env
});
if (!process.env.PORT) {
  dotenv.config({
    path: path.join(__dirname, "../.env"), // root/.env
  });
}

const app = express();
const PORT = process.env.PORT || 5000;

console.log("PORT is", process.env.PORT);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log("SERVER STARTED AT PORT", PORT);
});