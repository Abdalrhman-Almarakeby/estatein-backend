"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = exports.PropertySchema = exports.propertyZodSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const mongoose_zod_1 = require("mongoose-zod");
const feesZodSchema = zod_1.z.object({
    transferTax: zod_1.z.number(),
    legalFees: zod_1.z.number(),
    homeInspection: zod_1.z.number(),
    insurance: zod_1.z.number(),
    mortgage: zod_1.z.number(),
});
const costsZodSchema = zod_1.z.object({
    taxes: zod_1.z.number(),
    homeownersAssociationFee: zod_1.z.number(),
    insurance: zod_1.z.number(),
});
const initialCostsZodSchema = zod_1.z.object({
    listingPrice: zod_1.z.number(),
    additionalFees: zod_1.z.number(),
    downPayment: zod_1.z.number(),
    mortgage: zod_1.z.number(),
});
const priceZodSchema = zod_1.z.object({
    fees: feesZodSchema,
    costs: costsZodSchema,
    initialCosts: initialCostsZodSchema,
    listingPrice: zod_1.z.number(),
});
const propertyZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    location: zod_1.z.string(),
    bedrooms: zod_1.z.number(),
    bathrooms: zod_1.z.number(),
    area: zod_1.z.number(),
    image: zod_1.z.string(),
    features: zod_1.z.array(zod_1.z.string().min(1).min(10).max(100)),
    price: priceZodSchema,
});
exports.propertyZodSchema = propertyZodSchema;
const PropertySchema = (0, mongoose_zod_1.toMongooseSchema)(propertyZodSchema.mongoose({
    schemaOptions: {
        collection: "properties",
    },
}));
exports.PropertySchema = PropertySchema;
const Property = (0, mongoose_1.model)("Property", PropertySchema);
exports.Property = Property;
