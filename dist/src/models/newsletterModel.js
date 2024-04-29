"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterModel = exports.JoiSchema = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const newsletterSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
});
exports.JoiSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
}).required();
exports.NewsletterModel = (0, mongoose_1.model)("NewsletterEmail", newsletterSchema);
