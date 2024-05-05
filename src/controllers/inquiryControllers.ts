import { type Request, type Response } from "express";
import { InquiryModel, inquiryZodSchema } from "../models/inquiryModel";
import { validateLimit } from "../utils/validateLimit";

export async function getAllInquiries(req: Request, res: Response) {
  try {
    const queryLimit = req.query.limit && +req.query;
    const limit = queryLimit && validateLimit(queryLimit) ? queryLimit : 100;
    const inquiries = await InquiryModel.find().limit(limit);

    res.send(inquiries);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function createInquiry(req: Request, res: Response) {
  try {
    const { inquiryData } = req.body;

    const { error } = inquiryZodSchema.safeParse(inquiryData);
    if (error) return res.status(400).send(error.format());

    const newInquiry = await InquiryModel.create(inquiryData);
    if (!newInquiry) return res.status(400).send("Error creating new inquiry");

    res.status(201).send({
      success: true,
      message: "New inquiry is created successfully",
      data: newInquiry,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

export async function getInquiry(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const inquiry = await InquiryModel.findById(id);

    if (!inquiry) return res.status(404).send("Inquiry not found");

    res.send(inquiry);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function updateInquiry(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { inquiryData } = req.body;

    const { error } = inquiryZodSchema.safeParse(inquiryData);
    if (error) return res.status(400).send(error.format());

    const inquiry = await InquiryModel.findByIdAndUpdate(id, inquiryData, {
      new: true,
    });
    if (!inquiry) return res.status(404).send("Inquiry not found");

    res.send({
      success: true,
      message: "Inquiry updated successfully",
      data: inquiry,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function deleteInquiry(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const inquiry = await InquiryModel.findByIdAndDelete(id);

    if (!inquiry) return res.status(404).send("Inquiry not found");

    res.send({
      success: true,
      message: "Inquiry deleted successfully",
      data: inquiry,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
