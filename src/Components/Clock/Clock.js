import React, { Component } from 'react';
import Timer from './Timer';
import Title from "../Title/Title";
import { connect } from 'react-redux'
import { getMinute, getSeconds } from '../../Assets/Time';
import { storeFocusHelper, userCheck } from '../../ReduxActions/FocusActions'

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
        this.getIntervalStats = this.getIntervalStats.bind(this);
        this.storePomodoro = this.storePomodoro.bind(this);
        this.updateReason = this.updateReason.bind(this);
    }

    componentWillMount(){
        this.props.userCheck('username');
    }

    switchBreak(){
        clearTimeout(this.state.intervalId);
        this.startInterval({ isPomodoro: false, time:breakSeconds  });
    }

    startPomodoro(){
        this.setState({ isPomodoro: true, time:pomodoroSeconds});
    }

    reset(){
        console.log('reset called')
        if(this.state.time !== pomodoroSeconds ){
            if(this.state.isPomodoro){
                this.storePomodoro();
            }
            this.setState({ time:pomodoroSeconds, isPomodoro:true});
        }else{
            this.startInterval();
        }
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

    //BreakParams optional
    startInterval(timerParams = {}){
        let intervalId = setInterval(this.timerManager, 1000);
        let timeOutDict = {intervalId:intervalId}
        this.setState({ ...timeOutDict, ...timerParams, ...{isPaused:false} })
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

    getIntervalStats(){
        const isCompleteInterval = (pomodoroSeconds - this.state.time === pomodoroSeconds);
        const date = new Date()

        const focusStats = {
                key:date.getTime(),
                percentComplete:(pomodoroSeconds - this.state.time) / pomodoroSeconds,
                mins:getMinute(pomodoroSeconds - this.state.time),
                isComplete:isCompleteInterval,
                date:date,
                reason:this.state.reason,
                distraction:"",
                hidden: false,
            }
        this.props.storeFocusHelper(focusStats, 'username');
        return focusStats
    }

    storePomodoro(){
        const stats = this.getIntervalStats();
        //this.props.storePomodoro(stats);
    }

    updateReason(event){
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

const mapDispatchToProps = (dispatch) => {
    return {
        userCheck: (userName) => dispatch( userCheck(userName) ),
        storeFocusHelper: (focus, userName) => dispatch( storeFocusHelper(focus, userName) ),
    };
}

export default connect(null, mapDispatchToProps)(Clock);