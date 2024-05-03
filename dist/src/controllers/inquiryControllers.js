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
exports.deleteInquiry = exports.updateInquiry = exports.getInquiry = exports.createInquiry = exports.getAllInquiries = void 0;
const inquiryModel_1 = require("../models/inquiryModel");
const validateLimit_1 = require("../utils/validateLimit");
function getAllInquiries(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryLimit = req.query.limit && +req.query;
            const limit = queryLimit && (0, validateLimit_1.validateLimit)(queryLimit) ? queryLimit : 100;
            const inquiries = yield inquiryModel_1.InquiryModel.find().limit(limit);
            res.send(inquiries);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.getAllInquiries = getAllInquiries;
function createInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const { error } = inquiryModel_1.inquiryZodSchema.safeParse(data);
            if (error)
                return res.status(400).send(error.format());
            const newInquiry = yield inquiryModel_1.InquiryModel.create(data);
            if (!newInquiry)
                return res.status(400).send("Error creating new inquiry");
            res.status(201).send({
                success: true,
                message: "New inquiry is created successfully",
                data: newInquiry,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ err });
        }
    });
}
exports.createInquiry = createInquiry;
function getInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const inquiry = yield inquiryModel_1.InquiryModel.findById(id);
            if (!inquiry)
                return res.status(404).send("Inquiry not found");
            res.send(inquiry);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.getInquiry = getInquiry;
function updateInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const { error } = inquiryModel_1.inquiryZodSchema.safeParse(data);
            if (error)
                return res.status(400).send(error.format());
            const inquiry = yield inquiryModel_1.InquiryModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            if (!inquiry)
                return res.status(404).send("Inquiry not found");
            res.send({
                success: true,
                message: "Inquiry updated successfully",
                data: inquiry,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.updateInquiry = updateInquiry;
function deleteInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const inquiry = yield inquiryModel_1.InquiryModel.findByIdAndDelete(id);
            if (!inquiry)
                return res.status(404).send("Inquiry not found");
            res.send({
                success: true,
                message: "Inquiry deleted successfully",
                data: inquiry,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.deleteInquiry = deleteInquiry;
