const db = require("../models");
const {validateTokenPayload} = require("../models/token.model")
const Token = db.tutorials;

exports.create = (req, res) => {
    const {err} = validateTokenPayload(req.body);
    if (err) {
        res.status(400).send({ message: err.deatails[0].message });
        return;
    }

    Meter.findOne({code: req.body.meter_number})

    Token.create({
        code: '', 
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
                    "Error: Can't create token!",
            });
        });
};

exports.findOne = (req, res) => {
    const number = req.params.number;

    Token.findOne({code: number})
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found Token with id " + id,
                });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error: can't find Token with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const {err} = validateTokenPayload(req.body);
    if (err) {
        res.status(400).send({ message: err.deatails[0].message });
        return;
    }

    const number = req.params.number;

    Token.findOneAndUpdate({code: number}, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "Not Found",
                });
            } else res.send({ message: "Token updated successfully." });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error: can't update token with id=" + id,
            });
        });
};

exports.delete = (req, res) => {
    const number = req.params.number;

    Token.findOneAndDelete({code: number}, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Token with id=${id}. Maybe Token was not found!`,
                });
            } else {
                res.send({
                    message: "Token was deleted successfully!",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Token with id=" + id,
            });
        });
};
