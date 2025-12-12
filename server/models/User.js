import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  balance: { type: Number, default: 1000 }   // saldo del usuario
});

export default mongoose.model("User", UserSchema);
