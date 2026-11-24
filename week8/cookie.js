const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

// 1. Home Page
app.get("/", (req, res) => {
    res.send(`<h3>Cookies</h3>
        <a href="/buy/Laptop">Buy Laptop</a> | <a href="/buy/Mobile">Buy Mobile</a><br>
        <a href="/history">History</a> | <a href="/clear">Clear</a>`);
});

// 2. Buy Item (Save to Cookie)
app.get("/buy/:item", (req, res) => {
    let history = (req.cookies.history || "") + req.params.item + ", ";
    res.cookie("history", history);
    res.send(`${req.params.item} Bought! <a href="/">Home</a>`);
});

// 3. View History
app.get("/history", (req, res) => {
    res.send(`History: ${req.cookies.history || "Empty"} <br><a href="/">Home</a>`);
});

// 4. Clear History
app.get("/clear", (req, res) => {
    res.clearCookie("history");
    res.send(`Cleared! <a href="/">Home</a>`);
});

app.listen(3000, () => console.log("Server running on 3000"));