import "./Generator.css";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";

const Generator = () => {
  const [password, setpassword] = useState("");
  const [value, setValue] = useState(30);

  const alphabetUpper = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const symbols = ["!", "#", "$", "%", "&", "*", "/", "-", "+"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 30) {
      setValue(30);
    }
  };
  return (
    <div className="box">
      <h2>Password Generator</h2>
      <div className="password-results">
        <h3>ghghghghg</h3>
      </div>
      <div className="password-param-col">
        <p>Charecter Length</p>
        <Input
          value={value}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            min: 0,
            max: 30,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>
      <div className="password-col">
        <script src="range-input.js"></script>
        <Slider
          value={typeof value === "number" ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
        <div>
          <input type="checkbox" id="upper"></input>
          <label>Include Uppercase Letters</label>
        </div>
        <div>
          <input type="checkbox" id="lower"></input>
          <label>Include Lowercase Letters</label>
        </div>
        <div>
          <input type="checkbox" id="numbers"></input>
          <label>Include Numbers</label>
        </div>
        <div>
          <input type="checkbox" id="symbols"></input>
          <label>Include Symbols</label>
        </div>
        <div className="password-strength">
          <p>Strength</p>
        </div>
      </div>
    </div>
  );
};

export default Generator;
