import { db } from "../index"; // Ensure the path is correct

export class User {
  static async findByEmail(email: string) {
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0]; // Return the first user found
  }

  static async create(email: string, password: string) {
    const [result]: any = await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );
    return { id: result.insertId, email, password }; // Return the new user info
  }
}
