import React, { Component } from 'react';
import { connect } from "react-redux";
import PomodoroViz from './PomodoroViz';
import InputDistraction from "./InputDistraction"
import { hideFocus } from "../../ReduxActions/FocusActions"

class Pomodoro extends Component {
  constructor(props){
    super(props)

    this.deletePomodoro = this.deletePomodoro.bind(this);
  }

  deletePomodoro(){
    console.log(this.props.timeKey)
    this.props.hideFocus('username', this.props.timeKey)
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

    return (
        <div className="Pomodoro" key={timeKey}>
          { dateTag 
          ? <div className="dateDivider"> { dateTag }</div>
          : null }
          <div className="pomdoroContainer">
            <div className="remove" onClick={this.deletePomodoro} >
              x
            </div>
            <InputDistraction 
              date={date}
              distraction={distraction}
              selectionMade={selectionMade}
              timeKey={timeKey}
              onSelect={onSelect} />
          </div>

          <div>
            <PomodoroViz 
              percentComplete={percentComplete}
              mins={mins}
              isComplete={isComplete}
              date={date} />
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    hideFocus: (username, key) =>  dispatch(hideFocus(username, key))
  }
}

Pomodoro = connect(null, mapDispatchToProps)(Pomodoro)
export default Pomodoro;
