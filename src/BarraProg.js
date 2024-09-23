import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./index.css";

function BarraProg() {
  const [percent, setPercent] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => setInputValue(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const value = parseInt(inputValue);
      if (!isNaN(value) && value >= 0 && value <= 100) {
        setPercent(value);
      } else {
        alert("Por favor ingresa un valor entre 0 y 100");
      }
    }
  };

  return (
    <Card id="card">
      <Card.Body>
        Progress Bar
        <br />
        <ProgressBar animated now={percent} label={`${percent}%`} />
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p>Input Percentage: </p>
          <Form.Control
            type="number"
            placeholder="%"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            style={{
              width: "80px",
              margin: "auto",
            }}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default BarraProg;
