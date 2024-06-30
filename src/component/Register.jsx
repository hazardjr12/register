import React, { useState } from "react";
import "../index.css";

const Register = () => {
  // State to manage form inputs and errors
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    profile: null, // New field for profile image
  });

  const [formErrors, setFormErrors] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    profile: "", // New field for profile image
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation logic
    if (validateForm()) {
      console.log("Valid form submitted:", formData);

      // Create a FormData object to handle file upload
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });

      // Submit the form data to backend or perform further actions here
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

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input
    });
    // Reset error message when user starts typing again
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  // Function to validate form fields
  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validate each field
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
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid (must be 10 digits)";
      valid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (formData.password !== formData.password2) {
      errors.password2 = "Passwords do not match";
      valid = false;
    }

    if (!formData.profile) {
      // Validation for new field
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
        <div className="control">
          <label htmlFor="password2">CONFIRM PASSWORD</label>
          <input
            type="password"
            name="password2"
            id="password2"
            value={formData.password2}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
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
