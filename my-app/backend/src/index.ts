import express from "express";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mysql from "mysql2";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

export const db = mysql.createPool({
  // Use createPool for better management
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
