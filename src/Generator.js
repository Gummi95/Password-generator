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

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handlePassword = (e) => {
    e.preventDefault();
    let passwordList = [];
    while (passwordList.length < sliderValue) {
      const index = getRandomNumber(0, 3);
      if (index === 0 && checkedUpper === true) {
        let upperLetter = handleUpperCase();
        passwordList.push(upperLetter);
        console.log("upper", passwordList);
      } else if (index === 1 && checkedLower === true) {
        let lowerLetter = handleLowerCase();
        passwordList.push(lowerLetter);
        console.log("lower", passwordList);
      } else if (index === 2 && checkedSymbol === true) {
        let symbol = handleSymbols();
        passwordList.push(symbol);
        console.log("symbols", passwordList);
      } else if (index === 3 && checkedNumber === true) {
        let numb = handleNumbers();
        passwordList.push(numb);
        console.log("numbers", passwordList);
      }
    }
    setpassword(passwordList.join(""));
    setcheckedLower(false);
    setcheckedUpper(false);
    setcheckedNumber(false);
    setcheckedsymbol(false);
  };
  console.log(checkedUpper, checkedLower, checkedSymbol, checkedNumber);

  const handleUpperCase = () => {
    setcheckedUpper(!checkedUpper);
    console.log("checkedUpper", checkedUpper);
    const index = getRandomNumber(0, 25);
    return alphabet[index];
  };

  const handleLowerCase = () => {
    setcheckedLower(!checkedLower);
    console.log("checkedLower", checkedLower);
    const index = getRandomNumber(0, 25);
    return alphabet[index].toLocaleLowerCase();
  };

  const handleSymbols = () => {
    setcheckedsymbol(!checkedSymbol);
    console.log("checkedSymbol", checkedSymbol);
    const index = getRandomNumber(0, 8);
    return symbols[index];
  };

  const handleNumbers = () => {
    setcheckedNumber(!checkedNumber);
    console.log("checkedNumber", checkedNumber);
    const index = getRandomNumber(0, 8);
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
        <form onSubmit={handlePassword}>
          <div>
            <input
              type="checkbox"
              value={checkedUpper}
              id="upper"
              onChange={handleUpperCase}
              checked={checkedUpper}
            ></input>
            <label>Include Uppercase Letters</label>
          </div>
          <div>
            <input
              type="checkbox"
              value={checkedLower}
              id="lower"
              onChange={handleLowerCase}
              checked={checkedLower}
            ></input>
            <label>Include Lowercase Letters</label>
          </div>
          <div>
            <input
              type="checkbox"
              value={checkedNumber}
              id="numbers"
              onChange={handleNumbers}
              checked={checkedNumber}
            ></input>
            <label>Include Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              value={checkedSymbol}
              id="symbols"
              onChange={handleSymbols}
              checked={checkedSymbol}
            ></input>
            <label>Include Symbols</label>
          </div>
          <button>Generate Password</button>
        </form>
        <div className="password-strength">
          <p>Strength</p>
        </div>
      </div>
    </div>
  );
};

export default Generator;
