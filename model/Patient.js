const mongoose = require("mongoose");
const uuid = require("uuid");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  consultedTo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
