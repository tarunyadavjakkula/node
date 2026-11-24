const http = require("http");
const os = require("os");
const path = require("path");
const EventEmitter = require("events");

// 1. Create HTTP Server
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server running at http://127.0.0.1:3000/");
});

// 2. Check OS Information
console.log("OS Type:", os.type());
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU Cores:", os.cpus().length);

// 3. Check Path Operations
console.log("Current Directory:", __dirname);
console.log("Joined Path:", path.join(__dirname, "server.js"));

// 4. Custom Event
const myEmitter = new EventEmitter();
myEmitter.on("customEvent", (data) => {
    console.log("Custom Event Triggered:", data);
});

myEmitter.emit("customEvent", { message: "Hello from custom event!" });