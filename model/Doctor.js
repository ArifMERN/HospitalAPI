const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: 8,
    required: true,
  },
  treatedTo: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
