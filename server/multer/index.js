const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const upload = multer({ dest: "uploads/" });

// app.post("/", upload.single("img"), (req, res) => {
//     console.log(req.body);

//     res.status(200).send({ status: "success" });
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file);

        // {
        //     fieldname: 'img',
        //     originalname: '94.png',
        //     encoding: '7bit',
        //     mimetype: 'image/png'
        //   }

        const timestamp = new Date().getTime();
        const mimetype = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${timestamp}.${mimetype}`);
    },
});

const upload = multer({ storage: storage });

// upload.single("nome do input");
// front-end: <form action='/' enctype='multipart/form-data' method="post">
// <input type="file" name="avatar" />

app.post("/", upload.single("img"), (req, res) => {
    console.log(req.file);

    //   {
    //     fieldname: 'img',
    //     originalname: '94.png',
    //     encoding: '7bit',
    //     mimetype: 'image/png',
    //     destination: 'uploads/',
    //     filename: 'img-1671241982178.png',
    //     path: 'uploads\\img-1671241982178.png',
    //     size: 116319
    //   }

    res.status(200).send({ status: "success" });
});

app.listen(3000, () => {
    console.log("Server is running.");
});
