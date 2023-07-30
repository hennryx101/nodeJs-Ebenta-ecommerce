const express = require('express');
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
require('dotenv').config();

const userAuthRoute = require("./Routes/userAuthRoutes");
const productRoute = require("./Routes/productRoutes");
const adminAuthRoute = require("./Routes/adminAuthRoutes");
const authRoute = require("./Routes/authRoutes");
const shoppingRoute = require("./Routes/shoppingRoute");
const rateRoute = require("./Routes/rateRoute");
const checkoutRoute = require("./Routes/checkoutItemRoutes");


const { checkUser } = require("./Middleware/authMiddleware");
const connectDb = require("./Db/mongoDb");

app.use(express.static("./Public"));
app.use(express.static("./Public/Views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("*", checkUser)
app.use("/api/ratings", rateRoute);
app.use("/api/auth", userAuthRoute);
app.use("/api/admin", adminAuthRoute);
app.use("/api/auth/user", authRoute);
app.use("/api/products", productRoute);
app.use("/api/product", shoppingRoute);
app.use("/api/checkout", checkoutRoute);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Public/Views/404", "404page.html"));
});


const port = process.env.PORT || 3000;
connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`App Listening to port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });