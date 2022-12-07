import "./Generator.css";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Input from "@mui/material/Input";

const Generator = () => {
  const [password, setpassword] = useState("");
  const [checkedUpper, setcheckedUpper] = useState(false);
  const [checkedLower, setcheckedLower] = useState(false);
  const [checkedSymbol, setcheckedsymbol] = useState(false);
  const [checkedNumber, setcheckedNumber] = useState(false);
  const [sliderValue, setSliderValue] = useState(10);

  const LengthSlider = styled(Slider)({
    color: "#52af77",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-input-slider": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#52af77",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-input-sliderOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

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
      } else if (index === 1 && checkedLower === true) {
        let lowerLetter = handleLowerCase();
        passwordList.push(lowerLetter);
      } else if (index === 2 && checkedSymbol === true) {
        let symbol = handleSymbols();
        passwordList.push(symbol);
      } else if (index === 3 && checkedNumber === true) {
        let numb = handleNumbers();
        passwordList.push(numb);
      }
    }
    setpassword(passwordList.join(""));
    setcheckedLower(false);
    setcheckedUpper(false);
    setcheckedNumber(false);
    setcheckedsymbol(false);
  };

  const handleUpperCase = () => {
    setcheckedUpper(!checkedUpper);
    const index = getRandomNumber(0, 25);
    return alphabet[index];
  };

  const handleLowerCase = () => {
    setcheckedLower(!checkedLower);
    const index = getRandomNumber(0, 25);
    return alphabet[index].toLocaleLowerCase();
  };

  const handleSymbols = () => {
    setcheckedsymbol(!checkedSymbol);
    const index = getRandomNumber(0, 8);
    return symbols[index];
  };

  const handleNumbers = () => {
    setcheckedNumber(!checkedNumber);
    const index = getRandomNumber(0, 8);
    return numbers[index].toString();
  };

  return (
    <div className="box">
      <h2>Password Generator</h2>
      <div className="password-results">
        <h3>{password}</h3>
        <ContentPasteIcon className="copy-icon"></ContentPasteIcon>
      </div>
      <div className="password-param-col">
        <p>Charecter Length</p>
        <Input
          value={sliderValue}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          color="secondary"
          inputProps={{
            min: 0,
            max: 30,
            type: "number",
          }}
        />
      </div>
      <div className="password-col">
        <script src="range-input.js"></script>
        <LengthSlider
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
          <p>Strength</p>
          <div className="password-strength"></div>
          <button className="gen-button">Generate Password</button>
        </form>
      </div>
    </div>
  );
};

export default Generator;
