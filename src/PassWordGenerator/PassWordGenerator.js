import React, { useEffect, useState, useCallback } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Checkbox from "./Checkbox/Checkbox";
import passwordGif from "./assets/gif/password.gif";
import { ReactComponent as Copy } from "./assets/icons/copy.svg";
import { ReactComponent as Refresh } from "./assets/icons/refresh.svg";
import "./index.css";

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(10);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    strength: "",
    classname: "",
  });
  const [isCopied, setIsCopied] = useState(false);

  const [checkboxStates, setCheckboxStates] = useState({
    upper: true,
    lower: false,
    numbers: true,
    specialChars: false,
  });

  const { upper, lower, numbers, specialChars } = checkboxStates;

  const onChangePasswordLength = (value) => {
    setPasswordLength(value);
  };

  const generatePassword = useCallback(() => {
    let charSet = "";

    if (upper) {
      charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (lower) {
      charSet += "abcdefghijklmnopqrstuvwxyz";
    }
    if (specialChars) {
      charSet += "!@#$%^&*()";
    }
    if (numbers) {
      charSet += "0123456789";
    }

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      password += charSet[Math.floor(Math.random() * charSet.length)];
    }

    setPassword(password);
    evaluatePasswordStrength(password);
  }, [upper, lower, specialChars, numbers, passwordLength]);

  const evaluatePasswordStrength = (password) => {
    const strengthRegexes = [/[A-Z]/, /[a-z]/, /[!@#$%^&*()]/, /[0-9]/];

    let strength = 0;
    let passwordStrength;
    let classname;

    if (password.length < 8) {
      passwordStrength = "Too Short";
      classname = "danger";
    } else {
      strengthRegexes.forEach((regex) => {
        if (regex.test(password)) {
          strength++;
        }
      });

      if (strength < 3) {
        passwordStrength = "Weak";
        classname = "danger";
      } else if (strength < 4) {
        passwordStrength = "Medium";
        classname = "warning";
      } else {
        passwordStrength = "Strong";
        classname = "success";
      }
    }

    setPasswordStrength({ strength: passwordStrength, classname });
  };

  const handlePasswordFields = (e) => {
    const { name, checked } = e.target;
    setCheckboxStates((prev) => ({ ...prev, [name]: checked }));
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => generatePassword(), [generatePassword]);

  useEffect(() => {
    if (!upper && !lower && !numbers && !specialChars) {
      setCheckboxStates({
        upper: false,
        lower: true,
        numbers: false,
        specialChars: false,
      });
    }
  }, [upper, lower, numbers, specialChars]);

  const copyPassword = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const { strength, classname } = passwordStrength;

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input
            type="text"
            placeholder="your password"
            value={password}
            onChange={onChangePassword}
          />
          <Refresh onClick={generatePassword} />
        </div>
        <CopyToClipboard text={password} onCopy={copyPassword}>
          <button className="copy-btn">
            <Copy /> {isCopied ? "Copied" : "Copy"}
          </button>
        </CopyToClipboard>
      </div>
      <span className={`${classname} fw-500`}>{strength}</span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox
          id="uppercase"
          label="Uppercase"
          checked={upper}
          name="upper"
          onChange={handlePasswordFields}
        />
        <Checkbox
          id="lowercase"
          label="Lowercase"
          checked={lower}
          name="lower"
          onChange={handlePasswordFields}
        />
        <Checkbox
          id="numbers"
          label="Numbers"
          checked={numbers}
          name="numbers"
          onChange={handlePasswordFields}
        />
        <Checkbox
          id="special chars"
          label="Special Characters"
          checked={specialChars}
          name="specialChars"
          onChange={handlePasswordFields}
        />
      </div>
    </div>
  );
};

export default PasswordGenerator;
