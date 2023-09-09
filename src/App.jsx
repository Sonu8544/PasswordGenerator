import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Password generator function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "1234567890";
    }
    if (characterAllowed) {
      str += "!@#$%^&*()-_+=?[]{}|;:,.<>";
    }

    for (let i = 1; i <= length; i++) {
      // Changed the loop condition to use the 'length' state
      let char = Math.floor(Math.random() * str.length); // Fixed the random number generation
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  // Copy Password to clipboard
  const copyPassword = useRef(null);

  const copyPasswordToClipBoard = useCallback(() => { 
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div className="flex justify-center  ">
        <div>
          <div className="  w-full bg-gray-700 md:max-w-2xl rounded-2xl my-6 mx-4 py-5 text-yellow-600 text-lg ">
            <h1 className="text-white text-2xl ml-[200px] my-3 underline shadow-xl ">
              Password Generator
            </h1>
            {/* Input type  */}
            <div className="flex justify-center ">
              <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input
                  type="text"
                  className="outline-none min-w-[400px] text-orange-500 font-bold  py-1 px-3"
                  placeholder="Password"
                  value={password}
                  ref={copyPassword}
                  readOnly
                />
                <button
                  className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
                  onClick={copyPasswordToClipBoard}
                >
                  copy
                </button>
              </div>
            </div>
            {/* Range */}
            <div className="flex justify-center text-lg gap-x-2 gap-4 mx-3 ">
              <div className="flex item-center gap-x-1 ">
                <input
                  type="range"
                  min={6}
                  max={100}
                  value={length}
                  className=" text-2xl cursor-pointer  "
                  onChange={(e) => {
                    setLength(parseInt(e.target.value)); // Parse the value to an integer
                  }}
                />
                <label> Length: {length} </label>
              </div>
              <div className="flex flex-center gap-x-1 ">
                <input
                  type="checkbox"
                  checked={numberAllowed} // Changed 'defaultChecked' to 'checked'
                  id="numberInput"
                  onChange={() => {
                    setNumberAllowed((prev) => !prev);
                  }}
                />
                <label> Number: {numberAllowed.toString()} </label>{" "}
                {/* Display the actual value */}
              </div>
              <div className="flex flex-center  gap-x-1 ">
                <input
                  type="checkbox"
                  checked={characterAllowed} // Changed 'defaultChecked' to 'checked'
                  id="characterInput"
                  onChange={() => {
                    setCharacterAllowed((prev) => !prev);
                  }}
                />
                <label> Character: {characterAllowed.toString()} </label>{" "}
                {/* Display the actual value */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
