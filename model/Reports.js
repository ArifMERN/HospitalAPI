const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Negitive", "Mild-symptoms", "Positive"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
