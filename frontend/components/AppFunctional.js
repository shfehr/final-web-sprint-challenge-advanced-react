import React, {useState} from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const URL = 'http://localhost:9000/api/result'

//const [startingIndex, setStartingIndex] = useState()

export default function AppFunctional(props) {
  const [steps, setSteps] = useState(initialSteps)
  const [nextIndex, setNextIndex] = useState(initialIndex)
  const [index, setIndex] = useState(initialIndex)
  const [email, setEmail] = useState(initialEmail)
  // const [message, setMessage] = useState(initialMessage)

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  // console.log(initialIndex)
  function getXY() {
    const x = (index % 3) + 1
    let y
    if(index <=2) {
     y = 1
    } else if (index <= 5) {
     y = 2
    } else if (index <= 8) {
    y = 3
    }
    return [x,y]
  }
    //console.log(getXY()) - currently working


    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.


  function getXYMessage() {
    //invoke function
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    setEmail(initialEmail)
    setIndex(initialIndex)
    setSteps(initialSteps)
    
    // setMessage(initialMessage)
    //Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    switch (direction) {
      case 'up':
       if (index < 3) {
       break
       }   else {
       setIndex(index - 3)
       setSteps(steps + 1)
       return nextIndex
       }  
       
      case 'down':
       if (index > 5) {
        break
       }   else {
        setIndex(index + 3)
        setSteps(steps + 1)
        return nextIndex
       } 

      case 'right':
       if (index === 2 || index === 5 || index === 8) {
        break
       }   else {
        setIndex(index + 1)
        setSteps(steps + 1)
       } return nextIndex
       
      case 'left':
       if (index === 0 || index === 3 || index === 6) {
        break
       }   else {
        setIndex(index - 1)
        setSteps(steps + 1)
       } 
       
       return nextIndex
}


    //function 
    // switch method - case for up down left & right
    // 4 -- up -- 1
    // if index is less than 2 - current index = next index
    // else next index = current index - 3
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function moveBox(evt) {
    console.log(evt)
    const boxDirection = evt 
    const random = getNextIndex(boxDirection)
    getNextIndex(boxDirection)
    
    // next step
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }
  console.log(index)
  console.log(steps)

  function onChange(evt) {
    setEmail(evt.target.value)
    //
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // evt.preventDefault();
    

    // axios.post(URL,{})
    //   .then(res => {console.log(res)})
    //   .catch(err => {console.log(err)})
    // Use a POST request to send a payload to the server.
    
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button 
          id="left"
          // onClick={() => getNextIndex('left')}
          onClick={() => moveBox('left')}
          >LEFT
          </button>
        <button 
          id="up"
          onClick={() => moveBox('up')}>UP
          </button>
        <button 
          id="right"
          onClick={() => moveBox('right')}
          >RIGHT
          </button>
        <button 
          id="down"
          onClick={() => moveBox('down')}
          >DOWN
          </button>
        <button 
        id="reset"
        onClick={() => reset()}
        >reset</button>
      </div>
      <form>
        <input id="email" 
               type="email" 
               placeholder="type email"
               onChange = {onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
      }
    


