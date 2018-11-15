import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import Clock from './Components/Clock/Clock';
import Cabinet from './Components/Cabinet/Cabinet';
import './App.css';

const cookie = new Cookies();

function addPomodoroCookie(stats){
  if(cookie.get("poms") === undefined){
    cookie.set("poms", [],{ path: '/' });
  }

  let poms = cookie.get("poms");
  poms.unshift( stats );

  cookie.set("poms", poms,{ path: '/' });
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
        pomodoros:[]
    }

    this.storePomodoro = this.storePomodoro.bind(this);
  }

  storePomodoro(stats){
    var pomodoros = this.state.pomodoros;
    pomodoros.unshift(stats);
    addPomodoroCookie(stats);
    this.setState({ pomodoros: pomodoros })
  }
  componentDidMount(){
    document.title = "Productivity Viz"
  }

  render() {
    return (
      <div className="App">
        <Clock 
          storePomodoro={this.storePomodoro}
        />
        <Cabinet 
          pomodoros={this.state.pomodoros}
        />
      </div>
    );
  }
}

export default App;
