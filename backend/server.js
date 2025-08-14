import express from "express";
import dotenv from "dotenv";

dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000

console.log("PORT is ", process.env.PORT);


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world")
})
app.listen(PORT, () => {
    console.log("SERVER STARTED AT PORT ", PORT);
    
})