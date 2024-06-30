// src/components/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Valid form submitted:", formData);
      // Place to communicate with backend API
    } else {
      console.log("Invalid form - please check errors");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: val,
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
      valid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  return (
    <section className="container">
      <form id="form" className="form" onSubmit={handleSubmit}>
        <h2> sign in</h2>
        <div className="control">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          <small className="error">{formErrors.username}</small>
        </div>
        <div className="control">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <small className="error">{formErrors.password}</small>
        </div>
        <div className="control" id="remember">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />{" "}
            Remember me
          </label>
        </div>
        <div className="control">
          <p
            id="lost"
            type="button"
            onClick={() => navigate("/forgot-password")}
          >
            Lost Your Password?
          </p>
        </div>
        <input type="submit" className="button" value="Login" />
      </form>
    </section>
  );
};

export default Login;
