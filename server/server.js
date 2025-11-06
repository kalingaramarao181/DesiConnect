const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const categoryRoutes = require("./routes/categoryRoutes");
const adRoutes = require("./routes/adRoutes");

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api/adds", adRoutes);
app.use("/api/categories", categoryRoutes);


// Root
app.get("/", (req, res) => {
  res.send("🚀 DesiConnect API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
