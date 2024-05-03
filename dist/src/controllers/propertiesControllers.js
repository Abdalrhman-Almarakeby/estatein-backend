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
exports.deleteProperty = exports.updateProperty = exports.getProperty = exports.createProperty = exports.getAllProperties = void 0;
const propertyModel_1 = require("../models/propertyModel");
const validateLimit_1 = require("../utils/validateLimit");
function getAllProperties(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryLimit = req.query.limit && +req.query.limit;
            const limit = queryLimit && (0, validateLimit_1.validateLimit)(queryLimit) ? queryLimit : 100;
            const properties = yield propertyModel_1.Property.find().limit(limit);
            res.send(properties);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.getAllProperties = getAllProperties;
function createProperty(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const propertyData = req.body;
            const { error } = propertyModel_1.propertyZodSchema.safeParse(propertyData);
            if (error)
                return res.status(400).send(error.format());
            const newProperty = yield propertyModel_1.Property.create(propertyData);
            if (!newProperty)
                return res.status(400).send("Error creating property");
            res.status(201).send({
                success: true,
                message: "Property created successfully",
                property: newProperty,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.createProperty = createProperty;
function getProperty(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const property = yield propertyModel_1.Property.findById(id);
            if (!property)
                return res.status(404).send("Property not found");
            res.send(property);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.getProperty = getProperty;
function updateProperty(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const propertyData = req.body;
            const { error } = propertyModel_1.propertyZodSchema.safeParse(propertyData);
            if (error)
                return res.status(400).send(error);
            const updatedProperty = yield propertyModel_1.Property.findByIdAndUpdate(id, propertyData, { new: true });
            if (!updatedProperty)
                return res.status(400).send("Error updating property");
            res.status(200).send({
                success: true,
                message: "Property updated successfully",
                property: updatedProperty,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.updateProperty = updateProperty;
function deleteProperty(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const property = yield propertyModel_1.Property.findByIdAndDelete(id);
            if (!property)
                return res.status(404).send("Property not found");
            res.send({
                success: true,
                message: "Property created successfully",
                property,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.deleteProperty = deleteProperty;
