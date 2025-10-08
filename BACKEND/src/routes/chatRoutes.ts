import { Router } from "express";
import * as chatController from "../controllers/chatController";
import { authMiddleware } from "../middleware/authMiddleware";
import { handleUserMessage } from "../controllers/chatController";
import { addMessageToChatController} from '../controllers/chatController';



const router = Router();
// Todas las rutas requieren token
router.use(authMiddleware);


router.get("/", chatController.getChats);         // obtener todos
router.get("/:id", chatController.getChat);       // obtener uno
router.post("/", chatController.createChat);     // crear chat
router.delete("/", chatController.deleteAllChats); // borrar todos
router.delete("/:id", chatController.deleteChat);  // borrar uno
router.post('/:chatId/messages', authMiddleware, addMessageToChatController); // <-- nueva ruta
// Ruta para enviar mensaje a AI y obtener respuesta
router.post("/:chatId/ai", authMiddleware, chatController.sendAIResponse);
router.post("/:chatId/message", authMiddleware,);


export default router;
