import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// REGISTRO DE USUARIO
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ success: false, message: "El usuario ya existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.json({ success: true, user: newUser });
});

// LOGIN DE USUARIO
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ success: false, message: "Usuario no encontrado" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ success: false, message: "Contraseña incorrecta" });

  res.json({ success: true, user });
});

export default router;
