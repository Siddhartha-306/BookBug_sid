const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//for connecting frontend to backend
app.use(cors());

app.use(express.json());

//call for db to connect
require("./connectDB");

// const { signup, signin } = require("./routes/user");
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

//route
// app.use("/api/v1",signup);
// app.use("api/v1", signin);

app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

const port = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//     res.send("Hello doston ki haal");
// })

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});