import "./Generator.css";
import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

const Generator = () => {
  const [password, setpassword] = useState("");
  const [checkedUpper, setcheckedUpper] = useState(false);
  const [checkedLower, setcheckedLower] = useState(false);
  const [checkedSymbol, setcheckedsymbol] = useState(false);
  const [checkedNumber, setcheckedNumber] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [sliderValue, setSliderValue] = useState(10);
  const [passwordStrength, setpasswordStrength] = useState("");

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

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handlePassword = (e) => {
    e.preventDefault();
    let passwordList = [];
    if (password === null) {
      setpassword("");
    } else {
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
      if (password.length <= 5) {
        setpasswordStrength("Weak");
      } else if (password.length > 5 && password.length <= 10) {
        setpasswordStrength("Medium");
      } else if (password.length > 10) {
        setpasswordStrength("Strong");
      }
      setpassword(passwordList.join(""));
      setcheckedLower(false);
      setcheckedUpper(false);
      setcheckedNumber(false);
      setcheckedsymbol(false);
    }
  };

  const handleCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
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

  useEffect(() => {}, [password]);

  return (
    <div className="box">
      <h2>Password Generator</h2>
      <div className="password-results">
        <h3>{password}</h3>
        <CopyToClipboard text={password} onCopy={handleCopyText}>
          <ContentPasteIcon className="copy-icon"></ContentPasteIcon>
        </CopyToClipboard>
      </div>
      <div className="password-param-col">
        <p>Charecter Length</p>
        <h3>{sliderValue}</h3>
      </div>
      <div className="password-col">
        <LengthSlider
          value={typeof sliderValue === "number" ? sliderValue : 0}
          min={0}
          max={30}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
        />
        <form onSubmit={handlePassword}>
          <fieldset className="form-pass">
            <label>
              <input
                className="checkbox"
                type="checkbox"
                value={checkedUpper}
                id="upper"
                onChange={handleUpperCase}
                checked={checkedUpper}
              ></input>
              Include Uppercase Letters
            </label>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                value={checkedLower}
                id="lower"
                onChange={handleLowerCase}
                checked={checkedLower}
              ></input>
              Include Lowercase Letters
            </label>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                value={checkedNumber}
                id="numbers"
                onChange={handleNumbers}
                checked={checkedNumber}
              ></input>
              Include Numbers
            </label>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                value={checkedSymbol}
                id="symbols"
                onChange={handleSymbols}
                checked={checkedSymbol}
              ></input>
              Include Symbols
            </label>
          </fieldset>
          <div className="password-strength">
            <div className="password-strength-text">Strength</div>
            <div className="password-strength-rating">{passwordStrength}</div>
            <div
              className="strength-rating"
              style={{
                backgroundcolor: password.length >= 5 ? "yellow" : "black",
              }}
            ></div>
            <div
              className="strength-rating"
              style={{
                backgroundcolor:
                  password.length >= 5 && password.length <= 10
                    ? "yellow"
                    : "black",
              }}
            ></div>
            <div
              className="strength-rating"
              style={{
                backgroundcolor:
                  password.length >= 10 && password.length <= 15
                    ? "yellow"
                    : "black",
              }}
            ></div>
            <div
              className="strength-rating"
              style={{
                backgroundcolor:
                  password.length >= 15 && password.length <= 20
                    ? "yellow"
                    : "black",
              }}
            ></div>
          </div>
          <button className="gen-button">Generate Password</button>
        </form>
      </div>
    </div>
  );
};

export default Generator;
