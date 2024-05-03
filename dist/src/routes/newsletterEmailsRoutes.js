"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterEmailsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const newsletterControllers_1 = require("../controllers/newsletterControllers");
exports.newsletterEmailsRoutes = express_1.default.Router();
exports.newsletterEmailsRoutes.post("/", newsletterControllers_1.subscribe);
