import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  // ✅ FIXED HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let err = {};

    if (!form.email) err.email = "Email required";
    else if (!form.email.includes("@")) err.email = "Invalid email";

    if (!form.password) err.password = "Password required";
    else if (form.password.length < 6)
      err.password = "Min 6 characters";

    if (!isLogin && !form.name)
      err.name = "Name required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      if (isLogin) {
        const res = await loginUser({
          email: form.email,
          password: form.password
        });

        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);

       window.location.href = "/#/dashboard"; // ✅ dashboard open hoga
      } else {
        // ✅ FIXED REGISTER CALL
        await registerUser({
          name: form.name,
          email: form.email,
          password: form.password
        });

        alert("Registered successfully ✅");

        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Something went wrong"
      });
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {errors.api && <p className="error">{errors.api}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />

          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p>
        {isLogin ? "New user?" : "Already have an account?"}
        <span
          onClick={() => {
            setIsLogin(!isLogin);
            setErrors({});
            setForm({ name: "", email: "", password: "" });
          }}
          style={{ cursor: "pointer", marginLeft: "5px" }}
        >
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default Login;
