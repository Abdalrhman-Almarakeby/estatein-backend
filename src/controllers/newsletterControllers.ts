import { type Request, type Response } from "express";
import { NewsletterModel, JoiSchema } from "../models/newsletterModel";

export async function subscribe(req: Request, res: Response) {
  try {
    const data = req.body;

    const { error } = JoiSchema.validate(data);
    if (error) return res.status(400).send(error);

    const newEmail = await NewsletterModel.create(data);
    if (!newEmail) return res.status(400).send("Error subscribing to the newsletter");

    res.status(201).send({
      success: true,
      message: "Subscribed successfully to the newsletter",
      email: newEmail,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
