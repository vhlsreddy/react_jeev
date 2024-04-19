const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const path = require('path') // Don't forget to import 'path'
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

mongoose.connect("mongodb+srv://vhlsandhya:test123@cluster0.c2n7rm5.mongodb.net/health?retryWrites=true&w=majority&appName=Cluster0")

app.get("/getUsers", (req, res) => {
    UserModel.find({}).then(function (users) {
        res.json(users)
    }).catch(function (err) {
        res.json(err)
    })
})

app.post("/createUser", upload.single('file'), async (req, res) => {
    const { doctorName, patientName, patientAge, recordingDate } = req.body;
    const newUser = new UserModel({
        doctorName,
        patientName,
        patientAge,
        recordingDate,
        // Save the file path or file name in the database
        file: req.file.filename // Assuming 'file' is the name of the field in the form
    });
    await newUser.save();
    res.json(newUser);
})

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
})

app.listen(4000, () => {
    console.log("Server is Running")
})
