import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import Clock from './Components/Clock/Clock';
import Cabinet from './Components/Cabinet/Cabinet';
import Login from "./Components/Login/Login"

import './App.css';
import { connect } from "react-redux";


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
        pomodoros:[],
        login: true
    }

    this.storePomodoro = this.storePomodoro.bind(this);
    this.getAllUserFocus = this.getAllUserFocus.bind(this);
  }

  storePomodoro(stats){
    var pomodoros = this.state.pomodoros;
    pomodoros.unshift(stats);
    addPomodoroCookie(stats);
    this.setState({ pomodoros: pomodoros })
  }

  getAllUserFocus(){
    this.props.getAllUserFocus('username')
  }

  componentDidMount(){
    document.title = "Productivity Viz"
  }

  render() {
    return (
      <div className="App">
        { !this.state.login ? <Login />
        :<div> 
          <Clock storePomodoro={this.storePomodoro} />
          <Cabinet pomodoros={this.state.pomodoros} /> 
        </div> }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = (state) => {
  return{

  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;