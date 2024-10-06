import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findByEmail(email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.json({ token });
});

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = await User.create(email, hashedPassword);

  return res.json(newUser);
});

export default router;
