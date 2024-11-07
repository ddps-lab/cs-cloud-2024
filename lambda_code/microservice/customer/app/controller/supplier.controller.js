const Supplier = require("../models/supplier.model.js");
const { body, validationResult } = require("express-validator");
var payload = require("../../utils/payload-util.js");

exports.findAll = (req, res) => {
	Supplier.getAll((err, data) => {
		if (err) res.json(payload.error("500", { err }));
		else res.json(payload.success("supplier-all", { data }));
	});
};

exports.findOne = (req, res) => {
	Supplier.findById(req.query.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Supplier with id ${req.query.id}.`,
				});
			} else {
				res.json(payload.error("500", { message: `Error retrieving Supplier with id ${req.query.id}` }));
			}
		} else res.json(payload.success("supplier-find", { data }));
	});
};
