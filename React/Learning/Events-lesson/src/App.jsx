import React, { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [headerWasHovered, setHeaderWasHovered] = useState(false)
  const [favoriteColor, setFavoriteColor] = useState('')

  function handleCountIncrease() {
    setCount((prevCount) => prevCount + 1)
  }

  function handleUserHoveredOverHeader() {
    setHeaderWasHovered(!headerWasHovered)
  }

  function handleInputChange(event) {
    setFavoriteColor(event.target.value)
  }

  return (
    <div>
      <h1 
      onMouseEnter={handleUserHoveredOverHeader}
      onMouseLeave={handleUserHoveredOverHeader}
      >press to increase</h1>
      <button onClick={handleCountIncrease}>Increase Count</button>
      <p>{count}</p>
      { headerWasHovered ?
        <p>Header was hovered</p>
        :
        <p>Waiting for user to hover over the header</p>
      }
      <input type="text" value={favoriteColor} onChange={handleInputChange} placeholder="Type something here..." />
      <p>{favoriteColor}</p>
    </div>
  )
}

export default App
