"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const mongoose_1 = require("mongoose");
function validateId(req, res, next) {
    const { id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID");
    }
    next();
}
exports.validateId = validateId;
