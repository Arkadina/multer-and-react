const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");

const router = require("./routes/router");

const employeesController = require("./controllers/employeesController");

app.use(cors());

const db = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

var imgName = "";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();
        const mimetype = file.mimetype.split("/")[1];
        imgName = `${file.fieldname}-${timestamp}.${mimetype}`;
        cb(null, `${file.fieldname}-${timestamp}.${mimetype}`);
    },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("img"), (req, res) => {
    const { firstName, lastName, email, languages, state } = req.body.values;
    let data = { ...db };

    const newData = {
        id: data.employees[data.employees.length - 1].id + 1,
        firstName,
        lastName,
        email,
        languages,
        state,
        imgName,
    };

    data.employees = [...data.employees, { ...newData }];
    employeesController.writeFile(data);
    res.status(200).send({ status: "success" });
});

app.listen(3000, () => {
    console.log("Server is running.");
});
