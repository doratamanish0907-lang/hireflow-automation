import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://hireflow-automation.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        alert("Login Successful");

        navigate("/dashboard");
      }
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-10 rounded-2xl shadow-2xl w-[400px]">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Hireflow 🚀
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 rounded-lg mb-4 bg-slate-700 text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 rounded-lg mb-6 bg-slate-700 text-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-semibold"
        >
          Login
        </button>

        <div className="mt-6 text-center text-gray-400">
          Demo:
          <br />
          manish@gmail.com / 123456
        </div>
      </div>
    </div>
  );
}

export default Login;