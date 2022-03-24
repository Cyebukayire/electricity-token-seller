module.exports = (app) => {
    const token = require("../controllers/token.controller.js/index.js");

    var router = require("express").Router();

    // Create a new Token
    router.post("/", token.create);

    // Retrieve a single Token with id
    router.get("/:id", token.findOne);

    // Update a Token with id
    router.put("/:id", token.update);

    // Delete a Token with id
    router.delete("/:id", token.delete);

    app.use("/api/token", router);
};
