import bcrypt from "bcrypt";
import db from "./database"
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (userExists.length > 0) {
        return res.status(400).json({ message: "user exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO users (email, password VALUES (?, ?)", [email, hashedPassword]);

    res.status(201).json({ message: "successful" });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (userExists.length == 0) {
        res.status(400).json({ message: "no user exists" })
    };

};