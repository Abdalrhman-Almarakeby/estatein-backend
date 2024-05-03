import { z } from "zod";
import { model } from "mongoose";
import { genTimestampsSchema, toMongooseSchema } from "mongoose-zod";

const feesZodSchema = z.object({
  transferTax: z.number(),
  legalFees: z.number(),
  homeInspection: z.number(),
  insurance: z.number(),
  mortgage: z.number(),
});

const costsZodSchema = z.object({
  taxes: z.number(),
  homeownersAssociationFee: z.number(),
  insurance: z.number(),
});

const initialCostsZodSchema = z.object({
  listingPrice: z.number(),
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
  location: z.string(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  area: z.number(),
  image: z.string(),
  features: z.array(z.string().min(1).min(10).max(100)),
  price: priceZodSchema,
});

const PropertySchema = toMongooseSchema(
  propertyZodSchema.mongoose({
    schemaOptions: {
      collection: "properties",
    },
  })
);

const Property = model("Property", PropertySchema);

export { propertyZodSchema, PropertySchema, Property };
