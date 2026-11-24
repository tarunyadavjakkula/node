import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h3>Student Management System</h3>
      <Link to="/">Login</Link> |{" "}
      <Link to="/register">Register</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/about">About</Link> |{" "}
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

function Login({ student, setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (student && student.email === email && student.password === password) {
      setLogin(true);
      navigate("/dashboard");
    } else {
      alert("Invalid Login! Register first.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required /><br />
      <button type="submit">Login</button>
    </form>
  );
}

function Register({ setStudent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setStudent({ name, email, password });
    alert("Registered!");
    navigate("/");
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} required /><br />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required /><br />
      <button type="submit">Register</button>
    </form>
  );
}

function Dashboard({ student, login, setLogin }) {
  const navigate = useNavigate();

  if (!login || !student) {
    return <h3>Please Login First!</h3>;
  }

  return (
    <div>
      <h2>Welcome, {student.name}!</h2>
      <p>Email: {student.email}</p>
      <button onClick={() => { setLogin(false); navigate("/"); }}>Logout</button>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>Student Management System using React Router.</p>
    </div>
  );
}

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent!");
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact</h2>
      <input placeholder="Name" required /><br />
      <textarea placeholder="Message" required /><br />
      <button type="submit">Send</button>
    </form>
  );
}

export default function App() {
  const [student, setStudent] = useState(null);
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login student={student} setLogin={setLogin} />} />
        <Route path="/register" element={<Register setStudent={setStudent} />} />
        <Route path="/dashboard" element={<Dashboard student={student} login={login} setLogin={setLogin} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}