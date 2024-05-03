import express, { type Router } from "express";
import {
  getAllProperties,
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertiesControllers";

const router: Router = express.Router();

router.get("/", getAllProperties);
router.post("/", createProperty);
router.get("/:id", getProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;
