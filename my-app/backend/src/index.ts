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

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySql:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
