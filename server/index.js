import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/casino")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

app.listen(4000, () => console.log("Servidor en puerto 4000"));
