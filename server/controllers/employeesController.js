const path = require("path");
const fs = require("fs");

const db = require("../db/db.json");

const dirName = path.join(__dirname, "../db", "db.json");

function getEmployees(req, res) {
    res.send(db);
}

function getImage(req, res) {
    res.sendFile(
        path.join(__dirname, "../uploads", `${req.params.imgUrl}.png`)
    );
}

function writeFile(data) {
    fs.writeFile(dirName, JSON.stringify(data), (err) => {
        err && console.log(err);
    });
}

module.exports = { getEmployees, getImage, writeFile };
