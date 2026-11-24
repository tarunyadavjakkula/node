const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let students = [];

app.get("/api/students", (req, res) => res.json(students));

app.post("/api/students", (req, res) => {
    students.push(req.body);
    res.json({ message: "Student added" });
});

app.put("/api/students/:id", (req, res) => {
    let s = students.find(x => x.id == req.params.id);
    if (!s) return res.status(404).json({ message: "Not found" });
    Object.assign(s, req.body);
    res.json({ message: "Student updated" });
});

app.delete("/api/students/:id", (req, res) => {
    students = students.filter(x => x.id != req.params.id);
    res.json({ message: "Student deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));