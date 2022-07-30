const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
});

module.exports =
  mongoose.models.Client || mongoose.model("Client", clientSchema);
