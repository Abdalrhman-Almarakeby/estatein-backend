import express, { type Router } from "express";
import { subscribe } from "../controllers/newsletterControllers";

export const newsletterEmailsRoutes: Router = express.Router();

newsletterEmailsRoutes.post("/", subscribe);
