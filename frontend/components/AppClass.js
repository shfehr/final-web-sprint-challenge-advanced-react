import React from 'react'
import axios from 'axios'

// Suggested initial states
// this.initialState = {
// initialMessage = '',
// initialEmail = '',
// initialSteps = 0,
// initialIndex = 4, // the index the "B" is at
// URL = 'http://localhost:9000/api/result'
// }
// const initialState = {
//   message: initialMessage,
//   email: initialEmail,
//   index: initialIndex,
//   steps: initialSteps,
// }
const URL = 'http://localhost:9000/api/result'

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
constructor() {
  super();

  this.initialState = {
    initialMessage: '',
    initialEmail: '',
    initialSteps: 0,
    initialIndex: 4, // the index the "B" is at
    }

  this.state = {
    message: this.initialState.initialMessage,
    email: this.initialState.initialEmail,
    index: this.initialState.initialIndex,
    steps: this.initialState.initialSteps,
  }
}

  getXY = () => {
    const { index } = this.state
    const x = (index % 3) + 1
    let y
    if(index <=2) {
     y = 1
    } else if (index <= 5) {
     y = 2
    } else if (index <= 8) {
    y = 3
    }
    return ([x , y])
  }
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  

  getXYMessage = () => {

    const [x, y] = this.getXY()
    return(`(${x}, ${y})`)

    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    this.setState({
    message: '',
    email: '',
    index: 4,
    steps: 0,
    })
    // Use this helper to reset all states to their initial values.
  }

  getNextIndex = (direction) => {

    const { index, steps } = this.state;

    switch (direction) {
      case 'up':
        if(index < 3) {
          this.setState({message: "You can't go up"});
        } else {
          this.setState({
            index: index - 3,
            steps: steps + 1,
            message: '',
          });
        }
        break;

      case 'down':
        if(index > 5) {
          this.setState({message: "You can't go down"});
        } else {
          this.setState({
            index: index + 3,
            steps: steps + 1,
            message: '',
          });
        }
        break;
      
      case 'right':
        if(index === 2 || index === 5 || index === 8) {
          this.setState({message: "You can't go right"});
        } else {
          this.setState({
            index: index + 1,
            steps: steps + 1,
            message: '',
          });
        }
        break;

      case 'left':
        if(index === 0 || index === 3 || index === 6) {
          this.setState({message: "You can't go left"});
        } else {
          this.setState({
            index: index - 1,
            steps: steps + 1,
            message: '',
          });
        }
        break;

    }
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (boxDirection) => {

    this.getNextIndex(boxDirection)
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    this.setState({
      email: evt.target.value
    })
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const [x, y] = this.getXY();

    axios.post(URL, {email: this.state.email, steps: this.state.steps, x, y })
      .then(res=> {
        this.setState({
          email: '',
          message: res.data.message,
        });
      })
      .catch(err => {
        console.log(err)
        this.setState({
          email: '',
          message: err.response.data.message,
        })
      })
    // Use a POST request to send a payload to the server.
  }

  render() {
    // const [x, y] = this.getXY();
    const {className} = this.props

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? `time` : 'times'}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick = {() => this.move('left')}>
            LEFT</button>
          <button id="up" onClick = {() => this.move('up')}>
            UP</button>
          <button id="right" onClick = {() => this.move('right')}>
            RIGHT</button>
          <button id="down" onClick = {() => this.move('down')}>
            DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            onChange={this.onChange}
            value={this.state.email}
            ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}

