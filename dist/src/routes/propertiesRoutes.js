"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const propertiesControllers_1 = require("../controllers/propertiesControllers");
const validateId_1 = require("../middlewares/validateId");
const router = express_1.default.Router();
router.get("/", propertiesControllers_1.getAllProperties);
router.post("/", propertiesControllers_1.createProperty);
router.get("/:id", validateId_1.validateId, propertiesControllers_1.getProperty);
router.put("/:id", validateId_1.validateId, propertiesControllers_1.updateProperty);
router.delete("/:id", validateId_1.validateId, propertiesControllers_1.deleteProperty);
exports.default = router;
