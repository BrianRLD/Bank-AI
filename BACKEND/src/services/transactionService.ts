import {db} from "../db/connection";

export interface Transaction {
  id: number;
  account_id: number;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer" | "payment";
  description: string;
  date: string;
  created_at: string;
}

export const getTransactionsByUserId = async (userId: number): Promise<Transaction[]> => {
  const res = await db.query<Transaction>(
    `SELECT t.* 
     FROM transactions t
     JOIN accounts a ON t.account_id = a.id
     WHERE a.user_id = $1
     ORDER BY t.date DESC`,
    [userId]
  );
  return res.rows;
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const res = await db.query<Transaction>(
    `SELECT t.*, a.user_id 
     FROM transactions t
     JOIN accounts a ON t.account_id = a.id
     ORDER BY t.date DESC`
  );
  return res.rows;
};

export const createTransaction = async (
  account_id: number,
  amount: number,
  type: "deposit" | "withdrawal" | "transfer" | "payment",
  description: string,
  date: string
): Promise<Transaction> => {
  const res = await db.query<Transaction>(
    `INSERT INTO transactions (account_id, amount, type, description, date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [account_id, amount, type, description, date]
  );
  return res.rows[0];
};
