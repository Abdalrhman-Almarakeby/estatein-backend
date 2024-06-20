import express, { type Router } from "express";
import {
  getAllPropertiesInquiries,
  getPropertyInquiry,
  createPropertyInquiry,
  updatePropertyInquiry,
  deletePropertyInquiry,
} from "../controllers/propertiesInquiryControllers";
import { validateId } from "../middlewares/validateId";

export const propertiesInquiriesRoutes: Router = express.Router();

propertiesInquiriesRoutes.get("/", getAllPropertiesInquiries);
propertiesInquiriesRoutes.post("/", createPropertyInquiry);
propertiesInquiriesRoutes.get("/:id", validateId, getPropertyInquiry);
propertiesInquiriesRoutes.put("/:id", validateId, updatePropertyInquiry);
propertiesInquiriesRoutes.delete("/:id", validateId, deletePropertyInquiry);
