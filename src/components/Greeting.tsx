import { useState } from "react"

function Greeting() {
  const [message, setMessage] = useState(" ");

  return (
    <div>
      <p>{message}</p>
      <button onClick={() => setMessage("Hi")}>Hi</button>
      <button onClick={() => setMessage("Yes")}>Yes</button>
      <button onClick={() => setMessage(" ")}>Reset</button>
    </div>
  )
}

export default Greeting