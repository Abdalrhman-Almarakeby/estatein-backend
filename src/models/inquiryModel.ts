import { z } from "zod";
import { model } from "mongoose";
import { genTimestampsSchema, toMongooseSchema } from "mongoose-zod";

const HEAR_ABOUT_US = [
  "socialmedia",
  "ADs",
  "search",
  "business partner",
  "friend/family member",
  "other",
] as const;

const INQUIRY_TYPES = ["general", "properties", "agent", "inquiry", "other"] as const;

const inquiryZodSchema = z
  .object({
    firstName: z.string().min(1).min(3).max(30),
    lastName: z.string().min(1).min(3).max(30),
    email: z.string().min(1).email(),
    phone: z.string().min(1).min(10).max(14),
    inquiryType: z.enum(INQUIRY_TYPES),
    hearAboutUs: z.enum(HEAR_ABOUT_US),
    message: z.string().min(1).min(10).max(500),
  })
  .merge(genTimestampsSchema("crAt"));

const InquiryMongooseSchema = toMongooseSchema(
  inquiryZodSchema.mongoose({
    schemaOptions: {
      collection: "inquiries",
    },
  })
);

const InquiryModel = model("Inquiry", InquiryMongooseSchema);

export { inquiryZodSchema, InquiryModel };
