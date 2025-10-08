import { Request, Response } from "express";
import {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
} from "../services/accountService";

// GET /accounts
export const listAccounts = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; // El usuario viene del middleware de auth
    const role = req.user!.role;

    const accounts = await getAccounts(userId, role);
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las cuentas" });
  }
};

// GET /accounts/:id
export const getAccount = async (req: Request, res: Response) => {
  try {
    const accountId = parseInt(req.params.id);
    const account = await getAccountById(accountId);

    if (!account) return res.status(404).json({ message: "Cuenta no encontrada" });

    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la cuenta" });
  }
};

// POST /accounts (solo admin)
export const createNewAccount = async (req: Request, res: Response) => {
  try {
    const { user_id, account_number, account_type, balance, currency } = req.body;

    const newAccount = await createAccount(user_id, account_number, account_type, balance, currency);
    res.status(201).json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la cuenta" });
  }
};

// PATCH /accounts/:id
export const updateExistingAccount = async (req: Request, res: Response) => {
  try {
    const accountId = parseInt(req.params.id);
    const { balance, account_type } = req.body;

    const updatedAccount = await updateAccount(accountId, balance, account_type);
    if (!updatedAccount) return res.status(404).json({ message: "Cuenta no encontrada" });

    res.json(updatedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la cuenta" });
  }
};
