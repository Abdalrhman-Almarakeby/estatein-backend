"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLimit = void 0;
const MAX_LIMIT = 1000;
function validateLimit(limit) {
    if (!limit)
        return false;
    if (!Number.isInteger(limit))
        return false;
    if (limit < 0 || limit > MAX_LIMIT)
        return false;
    return true;
}
exports.validateLimit = validateLimit;
