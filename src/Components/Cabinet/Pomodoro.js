import React, { Component } from 'react';

import Cookies from 'universal-cookie';
import PomodoroViz from './PomodoroViz';

import { formatDateTime } from '../../Assets/Time';

const options = [null, "Social Media", "Phone", "Social Distraction", "Unexpected Event", "Other"]

class Pomodoro extends Component {
  constructor(props){
    super(props)

    this.deletePomodoro = this.deletePomodoro.bind(this);
    this.option = this.option.bind(this);
    this.selectionMade = this.selectionMade.bind(this);
  }

  deletePomodoro(){
    this.props.deletePomodoro(this.props.timeKey);
  }

  selectionMade(event){
    this.props.onSelect(this.props.timeKey, event.target.value);
  }

  option(select, active, index){
    if(active === select){
      return <option key={index} value={select} selected>{select}</option>
    }

    return <option key={index} value={select}>{select}</option>
  }

  render() {
    let distractionStyle;
    if(this.props.distraction){
      distractionStyle += " distractionSelected";
    }
    console.log(this.props.distraction)
    return (
        <div className="Pomodoro" >
          { this.props.dateTag ?
            <div className="dateDivider">
              {this.props.dateTag}
            </div>
          : null }
          <div className="pomdoroContainer">
            <div className="remove"
              onClick={this.deletePomodoro}
            >
              x
            </div>
            { !this.props.isComplete ?
              <div className="datetime reasonText">
              {formatDateTime(new Date(this.props.date))} 
              <div className="DistractionType">
                <select className={distractionStyle}
                  onChange={this.selectionMade}
                >
                  { options.map( (item, index) => this.option(item, this.props.distraction, index)) }
                </select>
              </div>
              </div>
            : null}
          </div>

          <div>
            <PomodoroViz 
              percentComplete={this.props.percentComplete}
              mins={this.props.mins}
              isComplete={this.props.isComplete}
              date={this.props.date}
            />
          </div>
        </div>
    );
  }
}

export default Pomodoro;
