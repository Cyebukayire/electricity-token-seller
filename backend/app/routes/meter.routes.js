module.exports = (app) => {
    const Meters = require("../controllers/meter.controller.js");

    var router = require("express").Router();

    // Create a new Meter
    router.post("/", Meters.create);

    // Retrieve a single Meter with id
    router.get("/:number", Meters.findOne);

    // Update a Meter with id
    router.put("/:number", Meters.update);

    // Delete a Meter with id
    router.delete("/:number", Meters.delete);

    app.use("/api/meters", router);
};
