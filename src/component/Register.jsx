import React, { useState } from "react";
import "../index.css"; // Ensure this path is correct based on your project structure
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    profile: null,
  });

  const [formErrors, setFormErrors] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    profile: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Valid form submitted:", formData);

      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });

      try {
        const response = await fetch("/your-endpoint", {
          method: "POST",
          body: formDataObj,
        });
        const result = await response.json();
        console.log("Form submitted successfully", result);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Invalid form - please check errors");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input
    });
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.fname.trim()) {
      errors.fname = "First name is required";
      valid = false;
    }

    if (!formData.lname.trim()) {
      errors.lname = "Last name is required";
      valid = false;
    }

    if (!formData.username.trim()) {
      errors.username = "Username is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      valid = false;
    } else if (!/^\d{11}$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid (must be 10 digits)";
      valid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (formData.password !== formData.password2) {
      errors.password2 = "Passwords do not match";
      valid = false;
    }

    if (!formData.profile) {
      errors.profile = "Profile image is required";
      valid = false;
    } else if (!formData.profile.type.startsWith("image/")) {
      errors.profile = "Profile image must be an image file";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  return (
    <section className="container">
      <form
        id="form"
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2>Sign Up</h2>
        <div className="control">
          <label htmlFor="fname">FIRSTNAME</label>
          <input
            type="text"
            name="fname"
            id="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="Enter your firstname"
          />
          <small className="error">{formErrors.fname}</small>
        </div>
        <div className="control">
          <label htmlFor="lname">LASTNAME</label>
          <input
            type="text"
            name="lname"
            id="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Enter your lastname"
          />
          <small className="error">{formErrors.lname}</small>
        </div>
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
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <small className="error">{formErrors.email}</small>
        </div>
        <div className="control">
          <label htmlFor="phone">PHONE</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone"
          />
          <small className="error">{formErrors.phone}</small>
        </div>
        <div className="control">
          <label htmlFor="password">PASSWORD</label>
          <div className="password-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEyeSlash : faEye}
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="eye-icon"
            />
          </div>
          <small className="error">{formErrors.password}</small>
        </div>
        <div className="control">
          <label htmlFor="password2">CONFIRM PASSWORD</label>
          <div className="password-wrapper">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="password2"
              id="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            <FontAwesomeIcon
              icon={confirmPasswordVisible ? faEyeSlash : faEye}
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="eye-icon"
            />
          </div>
          <small className="error">{formErrors.password2}</small>
        </div>
        <div className="control">
          <label htmlFor="profile">PROFILE IMAGE</label>
          <input
            type="file"
            name="profile"
            id="profile"
            onChange={handleChange}
            accept="image/*"
          />
          <small className="error">{formErrors.profile}</small>
        </div>
        <input type="submit" className="button" value="Register" />
      </form>
    </section>
  );
};

export default Register;
