import { useState } from 'react'
import './App.css'

function App() {
  
  const [input, setInput] = useState("");

  const handleChange = (e) =>{
    setInput(e.target.value);
  }

  return (
    <>
      <h1>Truth table maker</h1>
      <div>
      <label htmlFor="name-input">Name: </label>
      <input
        id="name-input"
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter your name"
      />
      <p>Current value: {input}</p>
    </div>
    </>
  )
}

export default App
