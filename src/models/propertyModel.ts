import { z } from "zod";
import { model } from "mongoose";
import { toMongooseSchema } from "mongoose-zod";
import { LOCATIONS } from "../constant/locations";

const feesZodSchema = z.object({
  transferTax: z.number(),
  legalFees: z.number(),
  homeInspection: z.number(),
  insurance: z.number(),
});

const costsZodSchema = z.object({
  taxes: z.number(),
  homeownersAssociationFee: z.number(),
});

const initialCostsZodSchema = z.object({
  additionalFees: z.number(),
  downPayment: z.number(),
  mortgage: z.number(),
});

const priceZodSchema = z.object({
  fees: feesZodSchema,
  costs: costsZodSchema,
  initialCosts: initialCostsZodSchema,
  listingPrice: z.number(),
});

const propertyZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.enum(LOCATIONS, {
    required_error: "Location is required",
    invalid_type_error: "Invalid location",
  }),
  bedrooms: z.number(),
  bathrooms: z.number(),
  area: z.number(),
  image: z.array(z.string()),
  features: z.array(z.string().min(1).min(10).max(100)),
  price: priceZodSchema,
});

const PropertyMongooseSchema = toMongooseSchema(
  propertyZodSchema.mongoose({
    schemaOptions: {
      collection: "properties",
    },
  })
);

const PropertyModel = model("Property", PropertyMongooseSchema);

export { propertyZodSchema, PropertyModel };
