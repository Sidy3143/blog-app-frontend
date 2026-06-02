import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await login(email, password);

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      alert("Logged in!");
      navigate("/");
    } else {
      alert("Login failed");
    }
  }

  return (
    <main className="post-detail">
      <h1>Login</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" type="submit">Login</button>
        </div>
      </form>
    </main>
  );
}