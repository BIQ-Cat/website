const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const config = require("../config");
const accounts = require("./routes/accounts");

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cors());
app.use(express.json());

const port = config.PORT || 3000;

mongoose.connect(config.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
  console.log("Successifully connected to MongoDB")
);

mongoose.connection.on("error", (err) =>
  console.error("MongoDB connection fails due to error: " + err)
);

app.use("/account", accounts);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
