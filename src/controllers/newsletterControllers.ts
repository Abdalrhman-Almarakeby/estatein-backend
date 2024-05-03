import { type Request, type Response } from "express";
import { NewsletterEmailModel, newsletterEmailZodSchema } from "../models/newsletterEmailModel";

export async function subscribe(req: Request, res: Response) {
  try {
    const data = req.body;

    const { error } = newsletterEmailZodSchema.safeParse(data);
    if (error) return res.status(400).send(error.format());

    const newEmail = await NewsletterEmailModel.create(data);
    if (!newEmail) return res.status(400).send("Error subscribing to the newsletter");

    res.status(201).send({
      success: true,
      message: "Subscribed successfully to the newsletter",
      data: newEmail,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}
