import { type Request, type Response } from "express";
import { Property, propertyZodSchema } from "../models/propertyModel";
import { validateLimit } from "../utils/validateLimit";

export async function getAllProperties(req: Request, res: Response) {
  try {
    const queryLimit = req.query.limit && +req.query.limit;
    const limit = queryLimit && validateLimit(queryLimit) ? queryLimit : 100;
    const properties = await Property.find().limit(limit);

    res.send(properties);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function createProperty(req: Request, res: Response) {
  try {
    const propertyData = req.body;

    const { error } = propertyZodSchema.safeParse(propertyData);
    if (error) return res.status(400).send(error.format());

    const newProperty = await Property.create(propertyData);
    if (!newProperty) return res.status(400).send("Error creating property");

    res.status(201).send({
      success: true,
      message: "Property created successfully",
      property: newProperty,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function getProperty(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) return res.status(404).send("Property not found");

    res.send(property);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function updateProperty(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const propertyData = req.body;

    const { error } = propertyZodSchema.safeParse(propertyData);
    if (error) return res.status(400).send(error);

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData, { new: true });
    if (!updatedProperty) return res.status(400).send("Error updating property");

    res.status(200).send({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function deleteProperty(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);

    if (!property) return res.status(404).send("Property not found");

    res.send({
      success: true,
      message: "Property created successfully",
      property,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
