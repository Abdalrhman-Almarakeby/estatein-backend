"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyInquiryModel = exports.propertyInquiryZodSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const mongoose_zod_1 = require("mongoose-zod");
const LOCATIONS = [
    "arizona",
    "california",
    "florida",
    "hawaii",
    "massachusetts",
    "michigan",
    "nebraska",
    "nevada",
    "new mexico",
    "new york",
    "ohio",
    "texas",
    "washington",
];
const PROPERTIES_TYPES = ["villa", "house", "apartment"];
const PRICING_RANGE = [
    "0-50000",
    "50000-100000",
    "100000-200000",
    "200000-300000",
    "300000-400000",
    "400000-500000",
    "500000-750000",
    "750000-1000000",
    "1000000-2000000",
    "2000000",
];
const PROPERTY_SIZE = [
    "0-100",
    "100-150",
    "150-200",
    "200-250",
    "250-300",
    "300-400",
    "400-500",
    "500-750",
    "750-1000",
    "1000",
];
const propertyInquiryZodSchema = zod_1.z
    .object({
    firstName: zod_1.z
        .string({
        required_error: "First Name is required",
        invalid_type_error: "Invalid First Name",
    })
        .min(1, "First Name is required")
        .min(3, "First name must be at least 3 characters long")
        .max(30, "First name must be at most 30 characters long"),
    lastName: zod_1.z
        .string({ required_error: "Last Name is required", invalid_type_error: "Invalid Last Name" })
        .min(1, "Last Name is required")
        .min(3, "Last name must be at least 3 characters long")
        .max(30, "Last name must be at most 30 characters long"),
    email: zod_1.z
        .string({ required_error: "Email is required", invalid_type_error: "Invalid Email" })
        .min(1, "Email is required")
        .email("Invalid Email"),
    phone: zod_1.z
        .string({
        required_error: "Phone Number is required",
        invalid_type_error: "Invalid Phone Number",
    })
        .min(1, "Phone Number is required")
        .min(10, "Phone number must be at least 10 digits long")
        .max(14, "Phone number must be at most 14 digits long"),
    preferredLocation: zod_1.z.enum(LOCATIONS, {
        required_error: "Preferred location is required",
        invalid_type_error: "Invalid preferred location",
    }),
    propertyType: zod_1.z.enum(PROPERTIES_TYPES, {
        required_error: "Property type is required",
        invalid_type_error: "Invalid property type",
    }),
    numOfBathrooms: zod_1.z.string().refine((value) => {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue >= 1 && numberValue <= 5;
    }, {
        message: "No. Of Bathrooms must be a number  between 1 and 5",
    }),
    numOfRooms: zod_1.z.string().refine((value) => {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue >= 1 && numberValue <= 10;
    }, {
        message: "No. Of Rooms must be a number  between 1 and 10",
    }),
    budget: zod_1.z.enum(PRICING_RANGE, {
        required_error: "Budget is required",
        invalid_type_error: "Invalid budget",
    }),
    propertySize: zod_1.z.enum(PROPERTY_SIZE, {
        required_error: "Property size is required",
        invalid_type_error: "Invalid property size",
    }),
    preferredContactMethod: zod_1.z.enum(["email", "phone"], {
        required_error: "Property size is required",
        invalid_type_error: "Invalid property size",
    }),
    message: zod_1.z
        .string({ required_error: "Message is required", invalid_type_error: "Invalid Message" })
        .min(1, "Message is required")
        .min(10, "Message must be at least 10 characters long")
        .max(500, "Message must be at most 500 characters long"),
})
    .merge((0, mongoose_zod_1.genTimestampsSchema)("crAt"));
exports.propertyInquiryZodSchema = propertyInquiryZodSchema;
const PropertyInquiryMongooseSchema = (0, mongoose_zod_1.toMongooseSchema)(propertyInquiryZodSchema.mongoose({
    schemaOptions: {
        collection: "propertyInquiries",
    },
}));
const PropertyInquiryModel = (0, mongoose_1.model)("PropertyInquiry", PropertyInquiryMongooseSchema);
exports.PropertyInquiryModel = PropertyInquiryModel;
