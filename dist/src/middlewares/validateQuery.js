"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = void 0;
function validateQuery(req, res, next) {
    const { limit } = req.query;
    // if there is a limit but it is not a number
    if (limit && isNaN(Number(limit)))
        return res.status(400).send("Limit must be a number");
    next();
}
exports.validateQuery = validateQuery;
