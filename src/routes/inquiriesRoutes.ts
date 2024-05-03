import express, { type Router } from "express";
import {
  getAllInquiries,
  getInquiry,
  createInquiry,
  updateInquiry,
  deleteInquiry,
} from "../controllers/inquiryControllers";
import { validateId } from "../middlewares/validateId";

export const inquiriesRoutes: Router = express.Router();

inquiriesRoutes.get("/", getAllInquiries);
inquiriesRoutes.post("/", createInquiry);
inquiriesRoutes.get("/:id", validateId, getInquiry);
inquiriesRoutes.put("/:id", validateId, updateInquiry);
inquiriesRoutes.delete("/:id", validateId, deleteInquiry);
