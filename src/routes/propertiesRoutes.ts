import express, { type Router } from "express";
import {
  getAllProperties,
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertiesControllers";
import { validateId } from "../middlewares/validateId";

export const propertiesRoutes: Router = express.Router();

propertiesRoutes.get("/", getAllProperties);
propertiesRoutes.post("/", createProperty);
propertiesRoutes.get("/:id", validateId, getProperty);
propertiesRoutes.put("/:id", validateId, updateProperty);
propertiesRoutes.delete("/:id", validateId, deleteProperty);
