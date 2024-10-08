import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User"; // Ensure the path is correct

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    res.status(401).json({ message: "User not found" });
  }

});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  //check if user exists
  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = await User.create(email, hashedPassword);

    return res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: "error occured" })
  }
});

export default router;
