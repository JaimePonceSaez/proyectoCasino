import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Obtener saldo del usuario
router.get("/balance/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.json({ success: false, message: "Usuario no encontrado" });

    res.json({ success: true, balance: user.balance });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Actualizar saldo del usuario
router.post("/balance/update", async (req, res) => {
  try {
    const { username, amount } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.json({ success: false, message: "Usuario no encontrado" });

    user.balance = amount;
    await user.save();

    res.json({ success: true, newBalance: user.balance });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

export default router;
