"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterEmailModel = exports.newsletterEmailZodSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const mongoose_zod_1 = require("mongoose-zod");
const newsletterEmailZodSchema = zod_1.z
    .object({
    email: zod_1.z.string().email(),
})
    .merge((0, mongoose_zod_1.genTimestampsSchema)("crAt"));
exports.newsletterEmailZodSchema = newsletterEmailZodSchema;
const NewsletterEmailMongooseSchema = (0, mongoose_zod_1.toMongooseSchema)(newsletterEmailZodSchema.mongoose({
    schemaOptions: {
        collection: "newsletterEmails",
    },
}));
const NewsletterEmailModel = (0, mongoose_1.model)("NewsletterEmail", NewsletterEmailMongooseSchema);
exports.NewsletterEmailModel = NewsletterEmailModel;
