import express, { type Router } from "express";
import {
  getAllProperties,
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertiesControllers";
import { validateId } from "../middlewares/validateId";

const router: Router = express.Router();

router.get("/", getAllProperties);
router.post("/", createProperty);
router.get("/:id", validateId, getProperty);
router.put("/:id", validateId, updateProperty);
router.delete("/:id", validateId, deleteProperty);

export default router;
