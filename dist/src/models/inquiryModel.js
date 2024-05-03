"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryModel = exports.inquiryZodSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const mongoose_zod_1 = require("mongoose-zod");
const HEAR_ABOUT_US = [
    "socialmedia",
    "ADs",
    "search",
    "business partner",
    "friend/family member",
    "other",
];
const INQUIRY_TYPES = ["general", "properties", "agent", "inquiry", "other"];
const inquiryZodSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().min(1).min(3).max(30),
    lastName: zod_1.z.string().min(1).min(3).max(30),
    email: zod_1.z.string().min(1).email(),
    phone: zod_1.z.string().min(1).min(10).max(14),
    inquiryType: zod_1.z.enum(INQUIRY_TYPES),
    hearAboutUs: zod_1.z.enum(HEAR_ABOUT_US),
    message: zod_1.z.string().min(1).min(10).max(500),
})
    .merge((0, mongoose_zod_1.genTimestampsSchema)("crAt"));
exports.inquiryZodSchema = inquiryZodSchema;
const InquiryMongooseSchema = (0, mongoose_zod_1.toMongooseSchema)(inquiryZodSchema.mongoose({
    schemaOptions: {
        collection: "inquiries",
    },
}));
const InquiryModel = (0, mongoose_1.model)("Inquiry", InquiryMongooseSchema);
exports.InquiryModel = InquiryModel;
