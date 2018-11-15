import React, { Component } from 'react';
import TimerButton from './TimerButton';

import Pomodoro from "./ButtonImages/Pomodoro";
import Reset from "./ButtonImages/Reset";
import Break from "./ButtonImages/Break";
import Play from "./ButtonImages/Play";

import { getMinute, getSeconds, singleDigitSeconds } from '../../Assets/Time';

const bttnNames = ["Start / Pause", "Reset",  "Break", "Focus"];

const timerBttnImg = {"Start / Pause":<Play />, "Reset":<Reset />,  "Break":<Break />, "Focus":<Pomodoro />};

function zipButtons(buttonFunctions){
  return bttnNames.map((name, i) => {
      return {name:name,f:buttonFunctions[i]}
  });
}

class Timer extends Component {
  constructor(props){
    super(props);

    const buttonParams = zipButtons(this.props.buttonFunctions);
    
    this.state = {
      buttonParams:buttonParams,
      reason:"not null"
    }
  }

  render() {
    return (
        <div className="clockControls">
          <div className="Timer">
            <span className="timerValue">{getMinute(this.props.time)}:{getSeconds(this.props.time)}</span>
          </div>

          <div className="buttonContainer">
            {this.state.buttonParams.map( (params, index) => 
              <div className="button" key={index}>
                <TimerButton
                  timerButtonImg={timerBttnImg[params.name]}
                  name={params.name}
                  onClick={params.f} />
              </div>
            )}
          </div>

        </div>
    );
  }
}

export default Timer;