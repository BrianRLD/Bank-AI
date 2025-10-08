import {db} from "../db/connection";

export interface Account {
  id: number;
  user_id: number;
  account_number: string;
  account_type: "checking" | "savings" | "credit";
  balance: number;
  currency: string;
  created_at: string;
}

// Obtener todas las cuentas (si es empleado/admin) o solo del usuario
export const getAccounts = async (userId: number, role: string): Promise<Account[]> => {
  if (role === "client") {
    const result = await db.query("SELECT * FROM accounts WHERE user_id = $1", [userId]);
    return result.rows;
  } else {
    const result = await db.query("SELECT * FROM accounts");
    return result.rows;
  }
};

// Obtener cuenta por ID
export const getAccountById = async (id: number): Promise<Account | null> => {
  const result = await db.query("SELECT * FROM accounts WHERE id = $1", [id]);
  return result.rows[0] || null;
};

// Crear nueva cuenta (solo admin)
export const createAccount = async (
  user_id: number,
  account_number: string,
  account_type: "checking" | "savings" | "credit",
  balance: number,
  currency = "USD"
): Promise<Account> => {
  const result = await db.query(
    `INSERT INTO accounts (user_id, account_number, account_type, balance, currency)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [user_id, account_number, account_type, balance, currency]
  );
  return result.rows[0];
};

// Actualizar cuenta (saldo o tipo)
export const updateAccount = async (
  id: number,
  balance?: number,
  account_type?: "checking" | "savings" | "credit"
): Promise<Account | null> => {
  const current = await getAccountById(id);
  if (!current) return null;

  const result = await db.query(
    `UPDATE accounts SET balance = $1, account_type = $2 WHERE id = $3 RETURNING *`,
    [balance ?? current.balance, account_type ?? current.account_type, id]
  );
  return result.rows[0];
};
