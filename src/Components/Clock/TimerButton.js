import React, { Component } from 'react';

class TimerButton extends Component {
  render() {
    return (
      <div  className="timerBttn bttn"
            onClick={this.props.onClick}
            type="button">
        <div className="timerBttnImg">
          {this.props.timerButtonImg}
        </div>
        <div className="bttnText">
          {this.props.name}
        </div>
      </div>
    );
  }
}

export default TimerButton;