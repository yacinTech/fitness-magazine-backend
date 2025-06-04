const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Subscription", subscriptionSchema);







