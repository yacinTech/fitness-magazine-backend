const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// استدعاء المسارات
app.use("/api/articles", require("./routes/articleRoutes"));
app.use("/api/subscribe", require("./routes/subscriptionRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
