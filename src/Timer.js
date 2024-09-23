import React from "react";
import { Card } from "react-bootstrap";
import { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      minutes: 0,
      isRunning: false,
    };

    this.counter = null;
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  startTimer() {
    if (!this.counter) {
      this.counter = setInterval(() => {
        this.setState((prevState) => {
          const newSeconds = prevState.seconds + 1;
          const newMinutes = prevState.minutes + Math.floor(newSeconds / 60);
          return {
            seconds: newSeconds % 60,
            minutes: newMinutes,
          };
        });
      }, 1000);
      this.setState({ isRunning: true });
    }
  }

  stopTimer() {
    clearInterval(this.counter);
    this.counter = null;
    this.setState({ isRunning: false });
  }

  resetTimer() {
    clearInterval(this.counter);
    this.counter = null;
    this.setState({ seconds: 0, minutes: 0, isRunning: false });
  }

  render() {
    return (
      <Card id="card">
        <Card.Body>
          <h1>Timer</h1>
          <br />
          <h2>
            {this.state.minutes.toString().padStart(2, "0")}:
            {this.state.seconds.toString().padStart(2, "0")}
          </h2>
          <br />
          <div className="btns">
            <input
              type="button"
              value="Start"
              onClick={this.startTimer}
              disabled={this.state.isRunning}
              style={{ backgroundColor: "green" }}
            />

            <input
              type="button"
              value="Stop"
              onClick={this.stopTimer}
              disabled={!this.state.isRunning}
              style={{ backgroundColor: "red" }}
            />

            <input
              type="button"
              value="Reset"
              onClick={this.resetTimer}
              style={{ backgroundColor: "yellow" }}
            />
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default Timer;
