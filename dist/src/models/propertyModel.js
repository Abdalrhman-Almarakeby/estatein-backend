"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyModel = exports.JoiSchema = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const propertySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
    price: {
        fees: {
            transferTax: {
                type: Number,
                required: true,
            },
            legalFees: {
                type: Number,
                required: true,
            },
            homeInspection: {
                type: Number,
                required: true,
            },
            insurance: {
                type: Number,
                required: true,
            },
            mortgage: {
                type: Number,
                required: true,
            },
        },
        costs: {
            taxes: {
                type: Number,
                required: true,
            },
            homeownersAssociationFee: {
                type: Number,
                required: true,
            },
            insurance: {
                type: Number,
                required: true,
            },
        },
        initialCosts: {
            listingPrice: {
                type: Number,
                required: true,
            },
            additionalFees: {
                type: Number,
                required: true,
            },
            downPayment: {
                type: Number,
                required: true,
            },
            mortgage: {
                type: Number,
                required: true,
            },
        },
        listingPrice: {
            type: Number,
            required: true,
        },
    },
}, {
    timestamps: true,
});
exports.JoiSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    bedrooms: joi_1.default.number().required(),
    bathrooms: joi_1.default.number().required(),
    area: joi_1.default.number().required(),
    image: joi_1.default.string().required(),
    features: joi_1.default.array().items(joi_1.default.string()).required(),
    price: joi_1.default.object({
        fees: joi_1.default.object({
            transferTax: joi_1.default.number().required(),
            legalFees: joi_1.default.number().required(),
            homeInspection: joi_1.default.number().required(),
            insurance: joi_1.default.number().required(),
            mortgage: joi_1.default.number().required(),
        }),
        costs: joi_1.default.object({
            taxes: joi_1.default.number().required(),
            homeownersAssociationFee: joi_1.default.number().required(),
            insurance: joi_1.default.number().required(),
        }),
        initialCosts: joi_1.default.object({
            listingPrice: joi_1.default.number().required(),
            additionalFees: joi_1.default.number().required(),
            downPayment: joi_1.default.number().required(),
            mortgage: joi_1.default.number().required(),
        }),
        listingPrice: joi_1.default.number().required(),
    }).required(),
}).required();
exports.PropertyModel = (0, mongoose_1.model)("Property", propertySchema);
