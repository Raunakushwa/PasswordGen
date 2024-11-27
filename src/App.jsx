import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  //useref hook
  const passwordRef = useRef(null);

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();  //this line will select password and turn it blue
    passwordRef.current?.setSelectionRange(0,3); //this line will select only 3 characters from password
    window.navigator.clipboard.writeText(password);  //due to thisline password will be copied
  },[password])


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "!#$%&*+=?@^_~";  //add any special characters that you want
    }

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, numberAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-7 my-8 py-5 text-orange-500 bg-gray-700">
        <h1 className='text-white text-center my-3' >Password Generator</h1>
        <div className="flex overflow-hidden shadow rounded-lg mb-4">
          <input type="text"
            value={password}
            className='outline-none w-full px-3 py-1'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button  onClick={copyPasswordToClipboard} className="bg-blue-700 outline-none text-white px-3 shrink-0 py-0.5">copy</button>
        </div>
        <div className="flex text-sm gap-x-5">     {/* this div will contains all functions of choosing password type */}
          <div className="flex items-center gap-x-1 slider">     {/* this div contains slider */}
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length :{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
