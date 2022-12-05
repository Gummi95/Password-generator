import "./Generator.css";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";

const Generator = () => {
  const [password, setpassword] = useState("");
  const [checked, setchecked] = useState(false);
  const [value, setValue] = useState(10);

  const alphabet = [
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

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handlePasswordlenght = () => {};

  const handleUpperCase = () => {
    const index = getRandomNumber(0, 25);
    return alphabet[index];
  };
  const handleLowerCase = () => {
    const index = getRandomNumber(0, 25);
    return alphabet[index].toLocaleLowerCase();
  };

  const handleSymbols = () => {
    const index = getRandomNumber(0, 8);
    return symbols[index];
  };

  const handleNumbers = () => {
    const index = getRandomNumber(0, 9);
    return numbers[index];
  };
  return (
    <div className="box">
      <h2>Password Generator</h2>
      <div className="password-results">
        <h3>{password}</h3>
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
          }}
        />
      </div>
      <div className="password-col">
        <script src="range-input.js"></script>
        <Slider
          value={typeof value === "number" ? value : 0}
          min={0}
          max={30}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
        <div>
          <input
            type="checkbox"
            id="upper"
            onChange={handleUpperCase}
            defaultChecked={checked}
          ></input>
          <label>Include Uppercase Letters</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="lower"
            onChange={handleLowerCase}
            defaultChecked={checked}
          ></input>
          <label>Include Lowercase Letters</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="numbers"
            onChange={handleSymbols}
            defaultChecked={checked}
          ></input>
          <label>Include Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="symbols"
            onChange={handleNumbers}
            defaultChecked={checked}
          ></input>
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
