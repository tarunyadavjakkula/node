const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "mysecretkey";

let students = [
    { id: 1, name: "Rahul", age: 20 },
    { id: 2, name: "Priya", age: 21 }
];

// 1. Login -> gives JWT token
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") {
        const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
        return res.json({ token });
    }
    res.status(401).send("Invalid credentials");
});

// 2. Middleware -> checks "Bearer <token>"
function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).send("Token missing");
    }
    try {
        req.user = jwt.verify(header.split(" ")[1], SECRET);
        next();
    } catch {
        res.status(403).send("Invalid token");
    }
}

// 3. CRUD Routes (protected by auth)
app.get("/students", auth, (req, res) => {
    res.json(students);
});

app.post("/students", auth, (req, res) => {
    const { id, name, age } = req.body;
    if (students.some(s => s.id === Number(id))) {
        return res.status(409).send("ID already exists");
    }
    students.push({ id: Number(id), name, age: Number(age) });
    res.send("Student added");
});

app.put("/students/:id", auth, (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));
    if (!student) return res.status(404).send("Not found");

    student.name = req.body.name;
    student.age = Number(req.body.age);
    res.send("Student updated");
});

app.delete("/students/:id", auth, (req, res) => {
    const exists = students.some(s => s.id === Number(req.params.id));
    if (!exists) return res.status(404).send("Not found");

    students = students.filter(s => s.id !== Number(req.params.id));
    res.send("Student deleted");
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));