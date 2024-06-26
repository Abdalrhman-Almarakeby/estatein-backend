"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_zod_1 = require("mongoose-zod");
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const limiter_1 = require("./middlewares/limiter");
const verifyKey_1 = require("./middlewares/verifyKey");
const propertiesRoutes_1 = require("./routes/propertiesRoutes");
const newsletterEmailsRoutes_1 = require("./routes/newsletterEmailsRoutes");
const inquiriesRoutes_1 = require("./routes/inquiriesRoutes");
const propertiesInquiriesRoute_1 = require("./routes/propertiesInquiriesRoute");
dotenv_1.default.config();
(0, mongoose_zod_1.setup)();
const app = (0, express_1.default)();
exports.app = app;
// Security
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(limiter_1.limiter);
app.use(verifyKey_1.verifyAPIKey);
// Compression
app.use((0, compression_1.default)());
// Parsing
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
// Routes
app.use("/properties", propertiesRoutes_1.propertiesRoutes);
app.use("/newsletter", newsletterEmailsRoutes_1.newsletterEmailsRoutes);
app.use("/inquiries", inquiriesRoutes_1.inquiriesRoutes);
app.use("/propertiesInquiries", propertiesInquiriesRoute_1.propertiesInquiriesRoutes);
// Error handling
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send("Server error");
});
