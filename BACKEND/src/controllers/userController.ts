import { Request, Response } from "express";
import { getAllUsers } from "../services/userService";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al obtener usuarios" });
  }
};
