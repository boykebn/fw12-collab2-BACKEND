const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config({
  path: ".env",
});

const port = process.env.PORT || 8888 ;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/uploads', express.static("uploads/"))

app.use("/", require("./src/routes"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running well",
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log(`http://localhost:${port}/`)
});
