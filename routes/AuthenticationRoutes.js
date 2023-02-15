const express = require ("express");
const authenticationController = require("./../controllers/AuthenticationController");
//const { route } = require("./usersRoute");

const authenticationRouter  = express.Router();

authenticationRouter.route("/login")
    .post(authenticationController.authenticationLogin)

    


module.exports = authenticationRouter ;