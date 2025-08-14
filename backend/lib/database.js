import mongoose from "mongoose";
import { DB_URL } from "../../env.js";

export const connectToDataBase = async (req, res) => {
  try {
    const con = await mongoose.connect(DB_URL);
    console.log("database connected on port:", con.connection.port);
  } catch (error) {
    console.log(error.message);
    // res.json({
    //   success: false,
    //   message: "failed connecting to Database",
    //   error: error,
    // });
    process.exit(1);
  }
};
