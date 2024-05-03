import { z } from "zod";
import { model } from "mongoose";
import { genTimestampsSchema, toMongooseSchema } from "mongoose-zod";

const newsletterEmailZodSchema = z
  .object({
    email: z.string().email(),
  })
  .merge(genTimestampsSchema("crAt"));

const NewsletterEmailMongooseSchema = toMongooseSchema(
  newsletterEmailZodSchema.mongoose({
    schemaOptions: {
      collection: "newsletterEmails",
    },
  })
);

const NewsletterEmailModel = model("NewsletterEmail", NewsletterEmailMongooseSchema);

export { newsletterEmailZodSchema, NewsletterEmailModel };
