"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAPIKey = void 0;
function verifyAPIKey(req, res, next) {
    const providedKey = req.headers["x-api-key"];
    if (!providedKey || providedKey !== process.env.API_SECRET_KEY) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}
exports.verifyAPIKey = verifyAPIKey;
