import { z } from "zod";
import { model } from "mongoose";
import { genTimestampsSchema, toMongooseSchema } from "mongoose-zod";

z;

const newsletterEmailZodSchema = z
  .object({
    email: z.string().email(),
  })
  .merge(genTimestampsSchema("crAt"));

const NewsletterEmailSchema = toMongooseSchema(
  newsletterEmailZodSchema.mongoose({
    schemaOptions: {
      collection: "newsletterEmails",
    },
  })
);

const NewsletterEmail = model("NewsletterEmail", NewsletterEmailSchema);

export { newsletterEmailZodSchema, NewsletterEmailSchema, NewsletterEmail };
