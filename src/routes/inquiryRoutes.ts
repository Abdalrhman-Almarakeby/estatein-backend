import express, { type Router } from "express";
import {
  getAllInquiries,
  getInquiry,
  createInquiry,
  updateInquiry,
  deleteInquiry,
} from "../controllers/inquiryControllers";
import { validateId } from "../middlewares/validateId";

const router: Router = express.Router();

router.get("/", getAllInquiries);
router.post("/", createInquiry);
router.get("/:id", validateId, getInquiry);
router.put("/:id", validateId, updateInquiry);
router.delete("/:id", validateId, deleteInquiry);

export default router;
