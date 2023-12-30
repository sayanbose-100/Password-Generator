import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [spcharAllowed, setSpCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (spcharAllowed) str += "!@#$%^&*-_+={}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, spcharAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, spcharAllowed, passwordGenerator]);

  return (
    <>
      <div className="outer-container">
        <h1 className="title">Password Generator</h1>

        <div className="input-container">
          <input
            type="text"
            value={password}
            className="pass-container"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button onClick={copyPasswordToClipboard} className="copy-btn">
            Copy
          </button>
        </div>

        <div className="ops-container">
          <div className="length">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="range-selector"
              onChange={(e) => setLength(e.target.value)}
              id="passlength"
            />
            <label htmlFor="passlength">Length: {length}</label>
          </div>

          <div className="checkbox-container">
            <div className="number-checkbox">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prevState) => !prevState);
                }}
              />
              <label htmlFor="numberInput">Number</label>
            </div>

            <div className="spchar-checkbox">
              <input
                type="checkbox"
                defaultChecked={spcharAllowed}
                id="charInput"
                onChange={() => {
                  setSpCharAllowed((prevState) => !prevState);
                }}
              />
              <label htmlFor="charInput">Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
