import { Request, Response } from "express";
import {
  getTransactionsByUserId,
  getAllTransactions,
  createTransaction,
} from "../services/transactionService";

export const listTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; // usuario autenticado
    const role = req.user!.role;

    let transactions;
    if (role === "admin" || role === "employee") {
      transactions = await getAllTransactions(); // todos los movimientos
    } else {
      transactions = await getTransactionsByUserId(userId); // solo del usuario
    }

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener transacciones" });
  }
};

export const createNewTransaction = async (req: Request, res: Response) => {
  try {
    const { account_id, amount, type, description, date } = req.body;

    if (!account_id || !amount || !type || !description || !date) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const transaction = await createTransaction(account_id, amount, type, description, date);
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear transacción" });
  }
};
