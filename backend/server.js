import express from "express";


const app = express();
const PORT = 5000;

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello world")
})


app.listen(PORT, () => {
    console.log("Server started at PORT: ", PORT);
    
})