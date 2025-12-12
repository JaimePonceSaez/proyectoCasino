import mongoose from "mongoose";

const BetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  game: String,
  betAmount: Number,
  result: String,
  payout: Number,
}, { timestamps: true });

export default mongoose.model("Bet", BetSchema);
