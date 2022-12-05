import "./Generator.css";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";

const Generator = () => {
  const [password, setpassword] = useState("");
  const [checkedUpper, setcheckedUpper] = useState(false);
  const [checkedLower, setcheckedLower] = useState(false);
  const [checkedSymbol, setcheckedsymbol] = useState(false);
  const [checkedNumber, setcheckedNumber] = useState(false);

  const [sliderValue, setSliderValue] = useState(10);

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
    setSliderValue(newValue);
  };

  const handleInputChange = (event) => {
    setSliderValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (sliderValue < 0) {
      setSliderValue(0);
    } else if (sliderValue > 30) {
      setSliderValue(30);
    }
  };

  const handleCheckboxChanger = () => {};

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handlePasswordlenght = () => {
    let passwordList = [];
    for (let i = 0; i < sliderValue; i++) {
      const index = getRandomNumber(0, 3);
      if (index == 0) {
        let upperLetter = handleUpperCase();
        passwordList.push(upperLetter);
      } else if (index == 1) {
        let lowerLetter = handleLowerCase();
        passwordList.push(lowerLetter);
      } else if (index == 2) {
        let symbol = handleSymbols();
        passwordList.push(symbol);
      } else if (index == 3) {
        let numb = handleNumbers();
        passwordList.push(numb);
      }
      setpassword(passwordList.join(""));
    }
  };

  const handleUpperCase = () => {
    const index = getRandomNumber(0, 25);
    console.log(alphabet[index]);
    return alphabet[index];
  };
  const handleLowerCase = () => {
    const index = getRandomNumber(0, 25);
    console.log(alphabet[index].toLocaleLowerCase());
    return alphabet[index].toLocaleLowerCase();
  };

  const handleSymbols = () => {
    const index = getRandomNumber(0, 8);
    console.log(symbols[index]);
    return symbols[index];
  };

  const handleNumbers = () => {
    const index = getRandomNumber(0, 8);
    console.log(numbers[index]);
    return numbers[index].toString();
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
          value={sliderValue}
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
          value={typeof sliderValue === "number" ? sliderValue : 0}
          min={0}
          max={30}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
        <div>
          <input
            type="checkbox"
            value={checkedUpper}
            id="upper"
            onChange={handleCheckboxChanger}
            defaultChecked={checked}
          ></input>
          <label>Include Uppercase Letters</label>
        </div>
        <div>
          <input
            type="checkbox"
            value={checkedLower}
            id="lower"
            onChange={handleCheckboxChanger}
            defaultChecked={checked}
          ></input>
          <label>Include Lowercase Letters</label>
        </div>
        <div>
          <input
            type="checkbox"
            value={checkedNumber}
            id="numbers"
            onChange={handleCheckboxChanger}
            defaultChecked={checked}
          ></input>
          <label>Include Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            value={checkedSymbol}
            id="symbols"
            onChange={handleCheckboxChanger}
            defaultChecked={checked}
          ></input>
          <label>Include Symbols</label>
        </div>
        <button onClick={handlePasswordlenght}>Geenerate Password</button>
        <div className="password-strength">
          <p>Strength</p>
        </div>
      </div>
    </div>
  );
};

export default Generator;
