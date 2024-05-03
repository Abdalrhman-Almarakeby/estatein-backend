"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inquiriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const inquiryControllers_1 = require("../controllers/inquiryControllers");
const validateId_1 = require("../middlewares/validateId");
exports.inquiriesRoutes = express_1.default.Router();
exports.inquiriesRoutes.get("/", inquiryControllers_1.getAllInquiries);
exports.inquiriesRoutes.post("/", inquiryControllers_1.createInquiry);
exports.inquiriesRoutes.get("/:id", validateId_1.validateId, inquiryControllers_1.getInquiry);
exports.inquiriesRoutes.put("/:id", validateId_1.validateId, inquiryControllers_1.updateInquiry);
exports.inquiriesRoutes.delete("/:id", validateId_1.validateId, inquiryControllers_1.deleteInquiry);
