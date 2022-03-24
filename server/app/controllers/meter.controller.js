const db = require("../models");
const {validateMeter} = require("../models/meter.model")
const {generateMeterNumber} = require("../utils/imports")
const Meter = db.tutorials;

exports.create = (req, res) => {
    const {err} = validateMeter(req.body);
    if (err) {
        res.status(400).send({ message: err.deatails[0].message });
        return;
    }

    Meter.create({
        code: generateMeterNumber(),
        owner_first_name: req.body.owner_first_name,
        owner_last_name: req.body.owner_last_name,
    })
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Meter.",
            });
        });
};

exports.findOne = (req, res) => {
    const number = req.params.number;

    Meter.findOne({code: number})
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found Meter with id " + id,
                });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Meter with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const {err} = validateMeter(req.body);
    if (err) {
        res.status(400).send({ message: err.deatails[0].message });
        return;
    }

    const number = req.params.number;

    Meter.findOneAndUpdate({code: number}, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "Not Found",
                });
            } else res.send({ message: "Meter was updated successfully." });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Meter with id=" + id,
            });
        });
};

exports.delete = (req, res) => {
    const number = req.params.number;

    Meter.findOneAndDelete({code: number}, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Meter with id=${id}. Maybe Meter was not found!`,
                });
            } else {
                res.send({
                    message: "Meter was deleted successfully!",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Meter with id=" + id,
            });
        });
};
