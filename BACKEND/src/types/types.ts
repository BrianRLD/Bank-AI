// src/types/types.ts
export interface Chat {
  id: number;
  userId: number;
  title: string;
  created_at: string;
}

export interface Message {
  id: number;
  chatId: number;
  sender: "user" | "bot" | "employee";
  text: string;
  created_at: string;
}

declare module "express" {
  interface Request {
    user?: {
      id: number;
      role: "client" | "employee" | "admin";
    };
  }
}