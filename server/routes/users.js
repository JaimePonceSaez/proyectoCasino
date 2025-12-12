import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET /api/users/me  → Perfil usuario
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/users/balance  → actualizar saldo
router.patch("/balance", authMiddleware, async (req, res) => {
  try {
    const { amount, op } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (op === "inc") user.balance += amount;
    else if (op === "dec") {
      if (user.balance < amount) return res.status(400).json({ message: "Insufficient balance" });
      user.balance -= amount;
    } else if (op === "set") user.balance = amount;
    else return res.status(400).json({ message: "Invalid operation" });

    await user.save();
    return res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
