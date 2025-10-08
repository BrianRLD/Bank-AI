import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import accountRoutes from "./routes/accountRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import chatRoutes from "./routes/chatRoutes";

import { authMiddleware } from "./middleware/authMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas públicas
app.use("/auth", authRoutes);

// Rutas protegidas
app.use("/users", authMiddleware, userRoutes);
app.use("/accounts", authMiddleware, accountRoutes);
app.use("/transactions", authMiddleware, transactionRoutes);
app.use("/chats", authMiddleware, chatRoutes);

// Middleware de manejo de errores (al final)
app.use(errorMiddleware);

export default app;
