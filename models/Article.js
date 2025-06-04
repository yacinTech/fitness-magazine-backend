const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, default: null }, // حفظ رابط الصورة هنا
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
