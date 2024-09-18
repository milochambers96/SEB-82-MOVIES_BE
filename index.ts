import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import router from "./config/router";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const dbUri = process.env.DB_URI || "mongodb://127.0.0.1:27017/moviesdb";

async function start() {
  // ! Before we start express, we connect to the database.
  await mongoose.connect(dbUri);
  console.log("Connected to the database! 🔥");

  app.listen(process.env.PORT, () => {
    console.log(
      `Express API is running on http://localhost:${process.env.PORT}`
    );
  });
}

start();
