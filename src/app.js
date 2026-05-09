const express = require("express");
const app = express();
const schoolRoutes = require("./routes/schoolRoutes");


app.use(express.json());


app.use("/", schoolRoutes);


app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

module.exports = app;
