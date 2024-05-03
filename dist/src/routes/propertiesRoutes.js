"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertiesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const propertiesControllers_1 = require("../controllers/propertiesControllers");
const validateId_1 = require("../middlewares/validateId");
exports.propertiesRoutes = express_1.default.Router();
exports.propertiesRoutes.get("/", propertiesControllers_1.getAllProperties);
exports.propertiesRoutes.post("/", propertiesControllers_1.createProperty);
exports.propertiesRoutes.get("/:id", validateId_1.validateId, propertiesControllers_1.getProperty);
exports.propertiesRoutes.put("/:id", validateId_1.validateId, propertiesControllers_1.updateProperty);
exports.propertiesRoutes.delete("/:id", validateId_1.validateId, propertiesControllers_1.deleteProperty);
