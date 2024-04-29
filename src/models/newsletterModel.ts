import { Schema, model } from "mongoose";
import Joi from "joi";

const newsletterSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

export const JoiSchema = Joi.object({
  email: Joi.string().email().required(),
}).required();

export const NewsletterModel = model("NewsletterEmail", newsletterSchema);
