const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String },
  description: {
    type: String,
  },
  status: { type: String, enum: ["Not Started", "In Progess", "Completed"] },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

module.exports =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
