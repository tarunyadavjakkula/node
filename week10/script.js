const val = id => document.getElementById(id).value;

function send(url, method, body) {
    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null
    })
        .then(res => res.json())
        .then(data => { alert(data.message); loadStudents(); });
}

function loadStudents() {
    fetch("/api/students")
        .then(res => res.json())
        .then(data => {
            studentTable.innerHTML = data.map(s => `
        <tr>
          <td>${s.id}</td><td>${s.name}</td><td>${s.age}</td><td>${s.course}</td>
          <td><button onclick="deleteStudent(${s.id})">Delete</button></td>
        </tr>`).join("");
        });
}

function addStudent() {
    send("/api/students", "POST", { id: Number(val("id")), name: val("name"), age: Number(val("age")), course: val("course") });
}

function updateStudent() {
    send("/api/students/" + val("id"), "PUT", { name: val("name"), age: Number(val("age")), course: val("course") });
}

function deleteStudent(id) {
    send("/api/students/" + id, "DELETE");
}

loadStudents();