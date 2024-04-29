"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const newsletterModel_1 = require("../models/newsletterModel");
function subscribe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { error } = newsletterModel_1.JoiSchema.validate(data);
            if (error)
                return res.status(400).send(error);
            const newEmail = yield newsletterModel_1.NewsletterModel.create(data);
            if (!newEmail)
                return res.status(400).send("Error subscribing to the newsletter");
            res.status(201).send({
                success: true,
                message: "Subscribed successfully to the newsletter",
                email: newEmail,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.subscribe = subscribe;
