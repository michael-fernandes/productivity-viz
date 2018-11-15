import React, { Component } from 'react';
import Timer from './Timer';
import Cookies from 'universal-cookie';
import Title from "../Title/Title";

import { getMinute, getSeconds } from '../../Assets/Time';

const pomodoroSeconds = 60*25;
const breakSeconds = 60*5;

class Clock extends Component{
    constructor(props){
        super(props);

        this.state = {
            time:pomodoroSeconds,
            intervalId:null,
            isPomodoro: true,
            isPaused:true,
            pomdoros:[]
        }

        this.timerManager = this.timerManager.bind(this);
        this.startInterval = this.startInterval.bind(this);
        this.reset = this.reset.bind(this);
        this.switchBreak = this.switchBreak.bind(this);
        this.startPomodoro = this.startPomodoro.bind(this);        
        this.pause = this.pause.bind(this);
        this.getPomodoroStats = this.getPomodoroStats.bind(this);
        this.storePomodoro = this.storePomodoro.bind(this);
        this.updateReason = this.updateReason.bind(this);
    }

    switchBreak(){
        clearTimeout(this.state.intervalId);
        this.startInterval({ isPomodoro: false, time:breakSeconds  });
    }

    startPomodoro(){
        this.setState({ isPomodoro: true, time:pomodoroSeconds});
    }

    reset(){
        if(this.state.time !== pomodoroSeconds ){
            if(this.state.isPomodoro){
                this.storePomodoro();
            }
            console.log("and this too?");
            this.setState({ time:pomodoroSeconds, isPomodoro:true});
        }else{
            console.log("time check not false");
            this.startInterval();
        }
    }
    
    getPomodoroStats(){
        let isComplete = (pomodoroSeconds - this.state.time === pomodoroSeconds);
        var date = new Date()

        let stats = {
                percentComplete:(pomodoroSeconds - this.state.time) / pomodoroSeconds,
                mins:getMinute(pomodoroSeconds - this.state.time),
                isComplete:isComplete,
                date:date,
                key:date.getTime(),
                reason:this.state.reason,
                distraction:""
            }
        return stats
    }
    
    pause(timeReset = {}){
        if(!this.state.isPaused){
           this.timerManager(); //immediately respond to mouse click
           clearInterval(this.state.intervalId);
           this.setState({isPaused: true, ...timeReset})
        } else{
            this.startInterval();
        }                
    }

    storePomodoro(){
        let stats = this.getPomodoroStats();
        this.props.storePomodoro(stats);
    }

    timerManager(){ 
        if(this.state.time - 1 >= 0){  
            this.setState({time: this.state.time - 1});
        } else{
            document.title = "Complete!"
            clearInterval(this.state.intervalId)
            if(this.state.isPomodoro){
                this.storePomodoro();
                this.setState({time: pomodoroSeconds, isPaused:true});
            }else{
                this.startPomodoro();
            }
        }  
    }

    //BreakParams optional
    startInterval(timerParams = {}){
        let intervalId = setInterval(this.timerManager, 1000);
        let timeOutDict = {intervalId:intervalId}
        this.setState({ ...timeOutDict, ...timerParams, ...{isPaused:false} })
    }

    componentDidMount(){
        //this.startInterval();
        return null;
    }

    updateReason(event){
        console.log('we are in update reason but crassshing');
        this.setState({[event.target.name]:event.target.value})
      }

    render(){
        document.title = getMinute(this.state.time) + ":" + getSeconds(this.state.time); //Not a fan of this being here.
        return (
            <div className="Clock">
                <Title />
                <Timer time={this.state.time}
                       buttonFunctions={[this.pause, this.reset, this.switchBreak, this.startPomodoro]}
                       updateReason={this.updateReason} />
            </div>
        );
    }
}

export default Clock;