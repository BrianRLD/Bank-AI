import {db} from "../db/connection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Login
export const login = async (email: string, password: string) => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  if (!user) throw new Error("Usuario no encontrado");

  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) throw new Error("Contraseña incorrecta");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

// Register (solo si quieres crear usuarios desde backend)
export const register = async (name: string, email: string, password: string, role: "client" | "employee" | "admin") => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
};
