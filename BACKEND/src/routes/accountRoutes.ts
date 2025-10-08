import { Router } from "express";
import {
  listAccounts,
  getAccount,
  createNewAccount,
  updateExistingAccount,
} from "../controllers/accountController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

router.get("/", listAccounts);
router.get("/:id", getAccount);
router.post("/", adminMiddleware, createNewAccount); // Solo admins
router.patch("/:id", adminMiddleware, updateExistingAccount); // Solo admins

export default router;
