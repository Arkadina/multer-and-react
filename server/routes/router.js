const express = require("express");

const employeesController = require("../controllers/employeesController");

const Router = express.Router();

Router.get("/", employeesController.getEmployees);
Router.get("/:imgUrl", employeesController.getImage);

module.exports = Router;
