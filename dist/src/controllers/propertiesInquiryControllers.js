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
exports.deletePropertyInquiry = exports.updatePropertyInquiry = exports.getPropertyInquiry = exports.createPropertyInquiry = exports.getAllPropertiesInquiries = void 0;
const propertyInquiryModel_1 = require("../models/propertyInquiryModel");
const validateLimit_1 = require("../utils/validateLimit");
function getAllPropertiesInquiries(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryLimit = req.query.limit && +req.query;
            const limit = queryLimit && (0, validateLimit_1.validateLimit)(queryLimit) ? queryLimit : 100;
            const propertiesInquiries = yield propertyInquiryModel_1.PropertyInquiryModel.find().limit(limit);
            res.send(propertiesInquiries);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.getAllPropertiesInquiries = getAllPropertiesInquiries;
function createPropertyInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const propertyInquiryData = req.body;
            const { error, data } = propertyInquiryModel_1.propertyInquiryZodSchema.safeParse(propertyInquiryData);
            console.log(data);
            console.log(error);
            if (error)
                return res.status(400).send(error.format());
            const newPropertyInquiry = yield propertyInquiryModel_1.PropertyInquiryModel.create(propertyInquiryData);
            if (!newPropertyInquiry)
                return res.status(400).send("Error creating new property inquiry");
            res.status(201).send({
                success: true,
                message: "New property inquiry is created successfully",
                data: newPropertyInquiry,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ err });
        }
    });
}
exports.createPropertyInquiry = createPropertyInquiry;
function getPropertyInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const propertyInquiry = yield propertyInquiryModel_1.PropertyInquiryModel.findById(id);
            if (!propertyInquiry)
                return res.status(404).send("Property inquiry not found");
            res.send(propertyInquiry);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.getPropertyInquiry = getPropertyInquiry;
function updatePropertyInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const propertyInquiryData = req.body;
            const { error } = propertyInquiryModel_1.propertyInquiryZodSchema.safeParse(propertyInquiryData);
            if (error)
                return res.status(400).send(error.format());
            const propertyInquiry = yield propertyInquiryModel_1.PropertyInquiryModel.findByIdAndUpdate(id, propertyInquiryData, {
                new: true,
            });
            if (!propertyInquiry)
                return res.status(404).send("Property inquiry not found");
            res.send({
                success: true,
                message: "Property inquiry updated successfully",
                data: propertyInquiry,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.updatePropertyInquiry = updatePropertyInquiry;
function deletePropertyInquiry(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const propertyInquiry = yield propertyInquiryModel_1.PropertyInquiryModel.findByIdAndDelete(id);
            if (!propertyInquiry)
                return res.status(404).send("Property Inquiry not found");
            res.send({
                success: true,
                message: "Property inquiry deleted successfully",
                data: propertyInquiry,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.deletePropertyInquiry = deletePropertyInquiry;
