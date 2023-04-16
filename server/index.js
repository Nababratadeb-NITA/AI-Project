const express = require("express");
const mongoose = require("mongoose");

const app = express();

// connect to MongoDB database
mongoose.connect(
  "mongodb+srv://nababrata17:nababrata17@cluster0.idk6lod.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// define a color schema
const colorSchema = new mongoose.Schema({
  color: String,
});

// define a color model
const Color = mongoose.model("Color", colorSchema);

// define API endpoints
app.get("/api/color", async (req, res) => {
  try {
    const color = await Color.findOne();
    res.json({ color: color ? color.color : null });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.post("/api/color", async (req, res) => {
  try {
    const { color } = req.body;
    const savedColor = await Color.findOneAndUpdate(
      {},
      { color },
      { upsert: true, new: true }
    );
    res.json({ color: savedColor.color });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
