import React, { Component } from 'react';

import Cookies from 'universal-cookie';
import PomodoroViz from './PomodoroViz';
import InputDistraction from "./InputDistraction"


class Pomodoro extends Component {
  constructor(props){
    super(props)

    this.deletePomodoro = this.deletePomodoro.bind(this);
  }

  deletePomodoro(){
    this.props.deletePomodoro(this.props.timeKey);
  }

  render() {
    const { 
      distraction, 
      dateTag, 
      isComplete, 
      percentComplete, 
      mins, 
      date, 
      selectionMade, 
      timeKey, 
      onSelect 
    } = this.props;
    
    console.log(distraction)
    return (
        <div className="Pomodoro" >
          { dateTag ?
            <div className="dateDivider">
              { dateTag }
            </div>
          : null }
          <div className="pomdoroContainer">
            <div className="remove"
              onClick={this.deletePomodoro}
            >
              x
            </div>
            <InputDistraction 
              date={date}
              distraction={distraction}
              selectionMade={selectionMade}
              timeKey={timeKey}
              onSelect={onSelect}
              />

          </div>

          <div>
            <PomodoroViz 
              percentComplete={percentComplete}
              mins={mins}
              isComplete={isComplete}
              date={date}
            />
          </div>
        </div>
    );
  }
}

export default Pomodoro;
