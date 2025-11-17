import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/admin/login", credentials);
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" >
      <div className="card shadow-sm border-0 p-3 p-md-5" style={{ maxWidth: "500px", width: "100%" , margin:"5% 0"}}>
        <h2 className="text-center text-primary fw-bold mb-4">تسجيل الدخول للإدارة</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">اسم المستخدم</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">كلمة المرور</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
}
