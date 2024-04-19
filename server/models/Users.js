const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    recordingDate: {
        type: Date,
        required: true
    },
    file: { // Add this field to store the file path or file name
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
