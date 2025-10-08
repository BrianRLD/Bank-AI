import { pool } from "../db/connection";

export const getAllUsers = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT id, name, email, role, status, created_at FROM users");
    return res.rows;
  } finally {
    client.release();
  }
};
