import express, { type Router } from "express";
import { subscribe } from "../controllers/newsletterControllers";

const router: Router = express.Router();

router.post("/", subscribe);

export default router;
