import { type Request, type Response } from "express";
import { PropertyInquiryModel, propertyInquiryZodSchema } from "../models/propertyInquiryModel";
import { validateLimit } from "../utils/validateLimit";

export async function getAllPropertiesInquiries(req: Request, res: Response) {
  try {
    const queryLimit = req.query.limit && +req.query;
    const limit = queryLimit && validateLimit(queryLimit) ? queryLimit : 100;
    const propertiesInquiries = await PropertyInquiryModel.find().limit(limit);

    res.send(propertiesInquiries);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function createPropertyInquiry(req: Request, res: Response) {
  try {
    const propertyInquiryData = req.body;

    const { error, data } = propertyInquiryZodSchema.safeParse(propertyInquiryData);
    console.log(data);
    console.log(error);
    if (error) return res.status(400).send(error.format());

    const newPropertyInquiry = await PropertyInquiryModel.create(propertyInquiryData);
    if (!newPropertyInquiry) return res.status(400).send("Error creating new property inquiry");

    res.status(201).send({
      success: true,
      message: "New property inquiry is created successfully",
      data: newPropertyInquiry,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

export async function getPropertyInquiry(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const propertyInquiry = await PropertyInquiryModel.findById(id);

    if (!propertyInquiry) return res.status(404).send("Property inquiry not found");

    res.send(propertyInquiry);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function updatePropertyInquiry(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const propertyInquiryData = req.body;

    const { error } = propertyInquiryZodSchema.safeParse(propertyInquiryData);
    if (error) return res.status(400).send(error.format());

    const propertyInquiry = await PropertyInquiryModel.findByIdAndUpdate(id, propertyInquiryData, {
      new: true,
    });
    if (!propertyInquiry) return res.status(404).send("Property inquiry not found");

    res.send({
      success: true,
      message: "Property inquiry updated successfully",
      data: propertyInquiry,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function deletePropertyInquiry(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const propertyInquiry = await PropertyInquiryModel.findByIdAndDelete(id);

    if (!propertyInquiry) return res.status(404).send("Property Inquiry not found");

    res.send({
      success: true,
      message: "Property inquiry deleted successfully",
      data: propertyInquiry,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
