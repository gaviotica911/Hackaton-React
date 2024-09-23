import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./index.css";

function Formulario() {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    age: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully!");
    } else {
      console.log("Form submission failed due to validation errors.");
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.username.trim()) {
      errors.username = "Username is required";
    } else if (data.username.length < 4) {
      errors.username = "Username must be at least 4 characters long";
    } else if (/[^a-zA-Z0-9]/.test(data.username)) {
      errors.username = "Username must not contain special characters";
    }

    if (!data.fullname.trim()) {
      errors.fullname = "Name is required";
    } else if (data.fullname.length < 5) {
      errors.fullname = "fullname must be at least 5 characters long";
    } else if (/[^a-zA-Z0-9]/.test(data.fullname)) {
      errors.username = "fullname must not contain special characters";
    }

    if (!data.age.trim()) {
      errors.age = "Age is required";
    } else if (parseInt(data.age) <= 18 || parseInt(data.age) >= 80) {
      errors.age = "The min age is 18 and the max is 80";
    } else if (!/^\d+$/.test(data.age)) {
      errors.age = "Age must contain only numbers";
    }

    return errors;
  };

  return (
    <Card id="card">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Username:</label>
            <br></br>
            <input
              className="form-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
            <br></br>
            <label className="form-label">FullName:</label>
            <br></br>
            <input
              className="form-input"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && (
              <span className="error-message">{errors.fullname}</span>
            )}
            <br></br>
            <label className="form-label">Age:</label>
            <br></br>
            <input
              className="form-input"
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>
          <br></br>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Card>
  );
}

export default Formulario;
