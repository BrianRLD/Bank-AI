import { Router } from "express";
import {
  listTransactions,
  createNewTransaction,
} from "../controllers/transactionController";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

router.get("/", listTransactions);
router.post("/", createNewTransaction); // Clientes pueden crear depósitos, pagos, transferencias

export default router;
