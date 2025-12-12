import express from "express";
import Wallet from "../models/Wallet.js";

const router = express.Router();

// Obtener saldo del usuario
router.get("/:username", async (req, res) => {
  const user = req.params.username;
  const wallet = await Wallet.findOne({ username: user });

  if (!wallet) {
    return res.json({ username: user, balance: 1000 });
  }

  res.json(wallet);
});

// Añadir dinero
router.post("/add", async (req, res) => {
  const { username, amount } = req.body;

  const wallet = await Wallet.findOneAndUpdate(
    { username },
    {
      $inc: { balance: amount },
      $push: { history: { type: "add", amount } }
    },
    { upsert: true, new: true }
  );

  res.json(wallet);
});

// Restar dinero
router.post("/remove", async (req, res) => {
  const { username, amount } = req.body;

  const wallet = await Wallet.findOne({ username });

  if (!wallet) return res.status(400).json({ message: "Usuario no existe" });
  if (wallet.balance < amount)
    return res.status(400).json({ message: "Fondos insuficientes" });

  wallet.balance -= amount;
  wallet.history.push({ type: "remove", amount });
  await wallet.save();

  res.json(wallet);
});

// Reiniciar saldo a 1000
router.post("/reset", async (req, res) => {
  const { username } = req.body;

  const wallet = await Wallet.findOneAndUpdate(
    { username },
    {
      balance: 1000,
      $push: { history: { type: "reset", amount: 1000 } }
    },
    { upsert: true, new: true }
  );

  res.json(wallet);
});

export default router;
