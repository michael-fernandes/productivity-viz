import React, { Component } from 'react';
import Cookies from 'universal-cookie';

//import { formatDate } from '../../Assets/Time';
import Pomodoro from "./Pomodoro";
import ProductivityTracker from "./ProductivityTracker"

const cookies = new Cookies();

function getCookie(){
  //force clear cookies
  //cookies.set("poms", [],{ path: '/' });
  if(cookies.get('poms') === undefined){
    return [];
  }
  return cookies.get('poms');
}

class Cabinet extends Component {
  constructor(props){
    super(props);

    this.state = {
      pomodoros:this.getPomodoros(),
      incomplete:0,
      complete:0
    }
    
    this.deletePomodoro = this.deletePomodoro.bind(this);
    this.updatePomodoros = this.updatePomodoros.bind(this);
    this.getPomodoros = this.getPomodoros.bind(this);
    this.countPomodoros = this.countPomodoros.bind(this);
    this.editPomodoro = this.editPomodoro.bind(this);
  }

  componentWillReceiveProps(){
    let pomodoros = this.getPomodoros();
    this.countPomodoros(pomodoros);
  } 
  
  componentWillMount(){
    let pomodoros = this.getPomodoros();
    this.countPomodoros(pomodoros);
  }

  getPomodoros(){
    let pomodoros = this.props.pomodoros;
    if(pomodoros == null){
      pomodoros = getCookie();
    }else{
      pomodoros = [...pomodoros, ...getCookie()];
    }
    return getCookie();
  }

  updatePomodoros(){
    this.setState({pomodoros:this.getPomodoroHelper()});
  }

  countPomodoros(pomodoros){
    let complete = 0; 
    let incomplete = 0;
    let prevDate = null;
    pomodoros.map((pomodoro, index) => {
      if(pomodoro.isComplete){
          complete += 1;  
      }else{
        incomplete += 1;
      }

      pomodoro.dateTag = dateHandler(pomodoro.date, prevDate);
      
      prevDate = pomodoro.date;
    })
    
    this.setState({ complete:complete, incomplete:incomplete, pomodoros:pomodoros});
  }

  deletePomodoro(key){
    let pomodoros = this.state.pomodoros;
    let remove = 1000000;
    for(let i =0; i < pomodoros.length; i++){
      if(pomodoros[i].key === key){
        remove = i;
      }
    }
    pomodoros.splice(remove, 1);

    cookies.set("poms", pomodoros,{ path: '/' });
    this.countPomodoros(pomodoros);
  }

  editPomodoro(key, distraction){
    let pomodoros = this.state.pomodoros;
    let edit = 1000000;
    for(let i =0; i < pomodoros.length; i++){
      if(pomodoros[i].key === key){
        edit = i;
      }
    }
    pomodoros[edit].distraction = distraction;

    cookies.set("poms", pomodoros,{ path: '/' });
    this.countPomodoros(pomodoros);
  }

  render() {
    return (
        <div className="Cabinet">
            <ProductivityTracker 
                complete={this.state.complete}
                incomplete={this.state.incomplete}
            />
            <div>
              {this.state.pomodoros.map( (item, index) =>
                <div key={item.key}> 
                  <div>
                        <Pomodoro
                            dateTag={item.dateTag}
                            percentComplete={item.percentComplete}
                            mins={item.mins}
                            isComplete={item.isComplete}
                            date={item.date}
                            deletePomodoro={this.deletePomodoro}
                            timeKey={item.key}
                            reason={item.reason}
                            distraction={item.distraction}
                            onSelect={this.editPomodoro}
                        />
                  </div>
                </div>
              )}
          </div>
      </div>
    );
  }
}

const weekDay = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
const monthName = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

function dateHandler(cd, pd){
  let currDate = new Date(cd);
  if(pd === null ){
    let today = new Date();
    if(currDate.getDate() === today.getDate() && currDate.getMonth() === today.getMonth() && currDate.getFullYear() === today.getFullYear()){
      return "Today"
    }
    else {
      return getDateName(currDate);
    }
  }
  let prevDate = new Date(pd);

  if(currDate.getDate() !== prevDate.getDate()){
    return getDateName(prevDate);
  }else{
    return null
  }
}

function getDateName(d){
  let date = new Date(d);
  return weekDay[date.getDay()] + ", " + monthName[date.getMonth()] + " " + date.getDate();
}
export default Cabinet;
