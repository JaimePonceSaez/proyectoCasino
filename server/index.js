import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());

// Conexión MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/casino");

// Rutas
app.use("/api/users", userRoutes);

app.listen(4000, () => console.log("Servidor iniciado en http://localhost:4000"));
