"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const mongoose_1 = require("mongoose");
function validateId(req, res, next) {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return res.status(400).send("Invalid object ID");
    }
    next();
}
exports.validateId = validateId;
