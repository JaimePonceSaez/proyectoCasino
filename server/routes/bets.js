import express from "express";
import Bet from "../models/Bet.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const bet = await Bet.create(req.body);
    res.json(bet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
