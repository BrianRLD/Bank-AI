// src/services/chatService.ts
import { db } from "../db/connection";
import type { Chat, Message } from "../types/types";
import fetch from "node-fetch"; // npm i node-fetch@2

// Obtener todos los chats
export const getAllChats = async () => {
  const res = await db.query("SELECT * FROM chats ORDER BY created_at DESC");
  return res.rows as Chat[];
};

// Obtener un chat específico con sus mensajes
export const getChatById = async (chatId: number) => {
  const chatRes = await db.query("SELECT * FROM chats WHERE id=$1", [chatId]);
  const messagesRes = await db.query(
    "SELECT * FROM messages WHERE chat_id=$1 ORDER BY created_at ASC",
    [chatId]
  );

  return {
    chat: chatRes.rows[0] as Chat,
    messages: messagesRes.rows,
  };
};

// Crear un nuevo chat
export const createChat = async (userId: number, title: string) => {
  const res = await db.query(
    "INSERT INTO chats (user_id, title) VALUES ($1, $2) RETURNING *",
    [userId, title]
  );
  return res.rows[0] as Chat;
};

// Función existente de agregar mensaje
export const addMessageToChat = async (
  chatId: number,
  sender: "user" | "bot",
  text: string
) => {
  const res = await db.query(
    "INSERT INTO messages (chat_id, sender, text) VALUES ($1, $2, $3) RETURNING *",
    [chatId, sender, text]
  );
  return res.rows[0] as Message;
};

// NUEVA función para AI
export const sendMessageToAI = async (chatId: number, prompt: string) => {
  // Guardar mensaje del usuario
  await addMessageToChat(chatId, "user", prompt);

  // Llamar a AI service Python
  const aiRes = await fetch("http://localhost:5001/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await aiRes.json();
  const botText = data.response || "⚠️ No se obtuvo respuesta del AI";

  // Guardar respuesta del bot
  await addMessageToChat(chatId, "bot", botText);

  return botText;
};

// src/services/chatService.ts
export const getLastTransactions = async (userId: number, limit: number = 3) => {
  const res = await db.query(
    `SELECT date, amount, type, account
     FROM transactions
     WHERE user_id=$1
     ORDER BY date DESC
     LIMIT $2`,
    [userId, limit]
  );
  return res.rows;
};


// Eliminar un chat específico
export const deleteChatById = async (chatId: number) => {
  await db.query("DELETE FROM messages WHERE chat_id=$1", [chatId]);
  await db.query("DELETE FROM chats WHERE id=$1", [chatId]);
};

// Eliminar todos los chats
export const deleteAllChats = async () => {
  await db.query("DELETE FROM messages");
  await db.query("DELETE FROM chats");
};

