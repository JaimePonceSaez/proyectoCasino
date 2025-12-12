import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  username: { type: String, required: true },
  balance: { type: Number, default: 1000 },
  history: [
    {
      type: { type: String }, // add, remove, reset
      amount: Number,
      date: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model("Wallet", WalletSchema);
