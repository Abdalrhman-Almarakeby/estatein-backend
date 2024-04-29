import { Schema, model } from "mongoose";
import Joi from "joi";

const propertySchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export const JoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  bedrooms: Joi.number().required(),
  bathrooms: Joi.number().required(),
  area: Joi.number().required(),
  image: Joi.string().required(),
  features: Joi.array().items(Joi.string()).required(),
  price: Joi.object({
    fees: Joi.object({
      transferTax: Joi.number().required(),
      legalFees: Joi.number().required(),
      homeInspection: Joi.number().required(),
      insurance: Joi.number().required(),
      mortgage: Joi.number().required(),
    }),
    costs: Joi.object({
      taxes: Joi.number().required(),
      homeownersAssociationFee: Joi.number().required(),
      insurance: Joi.number().required(),
    }),
    initialCosts: Joi.object({
      listingPrice: Joi.number().required(),
      additionalFees: Joi.number().required(),
      downPayment: Joi.number().required(),
      mortgage: Joi.number().required(),
    }),
    listingPrice: Joi.number().required(),
  }).required(),
}).required();

export const PropertyModel = model("Property", propertySchema);
