import React, { useState } from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at



export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)

  function getXY() {
    let xCoord
    let yCoord
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    //[ 0, 1, 2
    //  3, 4, 5
    //  6, 7, 8 3] Division is 'x' coordinate && Modulo is 'y' coordinate Use 3x3 cube
    if (index % 3 === 0) {
      yCoord = 1
    } else if (index % 3 === 1) {
      yCoord = 2
    } else if (index % 3 === 2) {
      yCoord = 3
    }

    if (Math.floor(index / 3) === 0) {
      xCoord = 1
    } else if (Math.floor(index / 3) === 1) {
      xCoord = 2
    } else if (Math.floor(index / 3) === 2) {
      xCoord = 3
    }
    return [xCoord, yCoord]
  } 


  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const [ x, y ] = getXY()
    return `Coordinates (${x}, ${y})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage)
    setEmail(initialEmail)
    setSteps(initialSteps)
    setIndex(initialIndex)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    switch (direction) {
      case 'left':
        if (index === 0 || index === 3 || index === 6) {
          return index
        }
        return index - 1;
      case 'right':
        if (index === 2 || index === 5 || index === 8) {
          return index
        }
        return index + 1;
      case 'up':
        if (index === 0 || index === 1 || index === 2) {
          return index
        }
        return index - 3;
      case 'down':
        if (index === 6 || index === 7 || index === 8) {
          return index
        }
        return index + 3
      default:
        return index
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const { id } = evt.target
    const nextIndex = getNextIndex(id)
    if (index === nextIndex) {
    setMessage(`You can't go ${id}`) 
    setSteps(steps)
    } else{
    setMessage(initialMessage)
    setIndex(nextIndex)
    setSteps(steps + 1)
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">LEFT</button>
        <button onClick={move} id="up">UP</button>
        <button onClick={move} id="right">RIGHT</button>
        <button onClick={move} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
