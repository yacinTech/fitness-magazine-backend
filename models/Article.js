const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  category: { type: String, required: true }, // التصنيف
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Article", articleSchema);
