import db from "../config/db";
import bcrypt from "bcrypt";

export class User {

    static async findByEmail(email: string) {
        try {
            const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
            if (rows.length === 0) return null;
            return rows[0];
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw error;
        }
    }

    static async create(email: string, hashedPassword: string) {
        try {
            const [result] = await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
            const newUserId = result.insertId;
            return { id: newUserId, email };
        } catch (error) {
            console.error("Error creating new user:", error);
            throw error;
        }
    }
}