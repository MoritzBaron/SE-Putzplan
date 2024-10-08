import { db } from "../index"; // Ensure the path is correct

export class User {
  //find user by email
  static async findByEmail(email) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows.length > 0 ? rows[0] : null; // Return the first user found}

    } catch (error) {
      throw error;
    }
  }

  //create new user
  static async create(email, password) {
    const [result] = await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );
    return { id: result.insertId, email, password }; // Return the new user info
  }
}

