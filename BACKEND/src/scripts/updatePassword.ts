import bcrypt from "bcryptjs";
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "bank_assistant",
  user: "postgres",
  password: "Brian2113@",
});

const userId = 2; // el ID del usuario que quieres actualizar
const newPassword = "sofiabank123"; // la contraseña que quieres usar

async function updatePassword() {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password_hash = $1 WHERE id = $2",
      [hashedPassword, userId]
    );

    console.log(`Contraseña actualizada correctamente para el usuario ${userId}`);
    pool.end();
  } catch (err) {
    console.error(err);
  }
}

updatePassword();
