// src/controllers/chatController.ts
import { Request, Response, NextFunction } from "express";
import * as chatService from "../services/chatService";
import { getLastTransactions, addMessageToChat } from "../services/chatService";
import { db } from "../db/connection";

interface AIResponse {
  response: string;
}

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    role: "client" | "employee" | "admin";
  };
}

export const sendAIResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { chatId } = req.params;
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ response: "⚠️ No se proporcionó prompt" });
    }

    const aiResponse = await chatService.sendMessageToAI(Number(chatId), prompt);
    res.json({ response: aiResponse });
  } catch (err) {
    next(err);
  }
};

export const getChats = async (req: Request, res: Response) => {
  try {
    const chats = await chatService.getAllChats();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener chats" });
  }
};

export const getChat = async (req: Request, res: Response) => {
  try {
    const chatId = parseInt(req.params.id);
    const chat = await chatService.getChatById(chatId);
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener chat" });
  }
};

export const createChat = async (req: Request, res: Response) => {
  try {
    const { userId, title } = req.body;
    const chat = await chatService.createChat(userId, title);
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: "Error al crear chat" });
  }
};

export const addMessageToChatController = async (req: Request, res: Response) => {
  const chatId = Number(req.params.chatId);
  const { sender, text } = req.body;

  if (!chatId || !sender || !text) {
    return res.status(400).json({ message: 'Faltan datos para crear el mensaje' });
  }

  try {
    const message = await addMessageToChat(chatId, sender, text);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear mensaje', error: err });
  }
};

// Borrar un chat por ID
export const deleteChat = async (req: Request, res: Response) => {
  try {
    const chatId = parseInt(req.params.id);
    await chatService.deleteChatById(chatId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error al borrar chat" });
  }
};

// Borrar todos los chats
export const deleteAllChats = async (req: Request, res: Response) => {
  try {
    await chatService.deleteAllChats();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error al borrar todos los chats" });
  }
};

export const handleUserMessage = async (chatId: number, userId: number, text: string) => {
  // Guardar mensaje del usuario
  await addMessageToChat(chatId, "user", text);

  let botReply = "";

   // Si el usuario pide correos de todos los usuarios
    if (/correos\s+de\s+usuarios/i.test(text)) {
      // Obtener correos desde la base de datos
      const result = await db.query("SELECT email FROM users");
      const emails = result.rows.map((row) => row.email);

      // Preparar prompt para AI
      const prompt = `Genera un listado breve y legible de estos emails: ${JSON.stringify(
        emails
      )}`;

      // Llamar al AI-service
      const aiRes = await fetch("http://localhost:5001/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = (await aiRes.json()) as { response?: string };
      botReply = data.response || "No se pudo generar el reporte.";
    } else {
      botReply = "Lo siento, no entendí tu mensaje.";}
    };