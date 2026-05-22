require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB =
require("./config/db");

const translationRoutes =
require("./routes/translation.routes");

const app = express();


// middleware
app.use(cors());
app.use(express.json());


// connect MongoDB
connectDB();


// routes
app.use(
"/translations",
translationRoutes
);


// test route
app.get("/", (req, res) => {
res.send("Server working");
});


// start server
app.listen(3000, () => {

console.log(
"Server running on port 3000"
);

});