const express = require("express");
const session = require("express-session");
const app = express();

app.use(session({ secret: "secret123", resave: false, saveUninitialized: true }));

// 1. Home Page
app.get("/", (req, res) => {
    res.send(`<h3>Express Session</h3>
        <a href="/buy/Laptop">Buy Laptop</a> | <a href="/buy/Mobile">Buy Mobile</a><br>
        <a href="/history">History</a> | <a href="/clear">Clear</a>`);
});

// 2. Buy Item (Save to Session Array)
app.get("/buy/:item", (req, res) => {
    if (!req.session.history) req.session.history = [];
    req.session.history.push(req.params.item);
    console.log("Session ID:", req.sessionID, req.session.history);
    res.send(`${req.params.item} Bought! <a href="/">Home</a>`);
});

// 3. View History
app.get("/history", (req, res) => {
    res.send(`History: ${(req.session.history || []).join(", ") || "Empty"} <br><a href="/">Home</a>`);
});

// 4. Clear History
app.get("/clear", (req, res) => {
    req.session.history = [];
    res.send(`Cleared! <a href="/">Home</a>`);
});

app.listen(3000, () => console.log("Server running on 3000"));