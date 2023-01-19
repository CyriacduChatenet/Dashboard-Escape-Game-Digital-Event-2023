import { useState } from 'react'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Escape Game</h1>
      <img src="Diginight_Logo_Bdx_Nantes_White.png" alt="" />
    </div>
  )
}

export default App
