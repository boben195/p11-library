// import mongoose from "mongoose";


// export async function connectionDB() {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI)
//         console.log("MongoDB connected: ", conn.connection.host);
        
//     } catch (error) {
//         console.log("Error with connection", error);
//         process.exit(1)
//     }
// }


import mongoose from "mongoose";

export async function connectionDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("❌ MONGO_URI is missing in .env file");
    process.exit(1); // Exit with failure code
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}