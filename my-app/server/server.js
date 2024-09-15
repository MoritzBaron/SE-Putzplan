const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3001;
const saltRound = 10;
const SECRETKEY = process.env.SECRETKEY;

app.use(express.json());
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

const db = mysql.createConnection({
    user: "root",
    host: "db",
    password: "nudelnmitpesto", //actual password
    database: "login-system", //databasename
});

//Login Route
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(401).json({ message: "invalid email or password" });
    }

    const validPassword = bcrypt.compareSync(password, user.passwordHash);
    if (!validPassword) {
        return res.status(401).json({ message: "invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "your_jwt_secret", { expiresIn: "1h" });

    res, json({ token });
});

//getChores protected
app.get("/api/chores", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await db.query(
            "SELECT * FROM chores WHERE wg_id = ?",
            [userId]
        );

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status({ message: "No chores found for this user" });
        }
    } catch (err) {
        console.error("error fetching chores", err);
        res.status(500).json({ message: "internal server error" });
    }
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:${PORT}");
});