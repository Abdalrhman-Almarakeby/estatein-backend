"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertiesInquiriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const propertiesInquiryControllers_1 = require("../controllers/propertiesInquiryControllers");
const validateId_1 = require("../middlewares/validateId");
exports.propertiesInquiriesRoutes = express_1.default.Router();
exports.propertiesInquiriesRoutes.get("/", propertiesInquiryControllers_1.getAllPropertiesInquiries);
exports.propertiesInquiriesRoutes.post("/", propertiesInquiryControllers_1.createPropertyInquiry);
exports.propertiesInquiriesRoutes.get("/:id", validateId_1.validateId, propertiesInquiryControllers_1.getPropertyInquiry);
exports.propertiesInquiriesRoutes.put("/:id", validateId_1.validateId, propertiesInquiryControllers_1.updatePropertyInquiry);
exports.propertiesInquiriesRoutes.delete("/:id", validateId_1.validateId, propertiesInquiryControllers_1.deletePropertyInquiry);
