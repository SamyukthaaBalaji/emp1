const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

// Define your routes here---->login and register route
app.use("/auth", require("./routes/jwtauth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/user", require("./routes/user"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
