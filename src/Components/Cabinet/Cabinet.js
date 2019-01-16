import React, { Component } from 'react';
import { connect } from 'react-redux'
import { userCheck, updateDistraction } from '../../ReduxActions/FocusActions'
import { distractionCount } from '../../ReduxActions/VisualizationActions'

import ReactLoading from 'react-loading';
 
//import { formatDate } from '../../Assets/Time';
import Pomodoro from "./Pomodoro";
import ProductivityTracker from "./ProductivityTracker"

class Cabinet extends Component {
  constructor(props){
    super(props);
    
    this.editPomodoro = this.editPomodoro.bind(this);
  }  

  editPomodoro(key, distraction){
    console.log(key, distraction)
    if(distraction !== "other"){
      this.props.updateDistraction("username", key, distraction);
    }
  }

  render() {
    let complete, incomplete;
    if(this.props.counts !== undefined){
      complete = this.props.counts.complete;
      incomplete = this.props.counts.incomplete; 
    } else {
      complete = 0;
      incomplete = 0;
    }
    console.log(incomplete);
    return (
        <div className="Cabinet">
            <ProductivityTracker 
              complete={complete}
              incomplete={incomplete}
              userName={'username'}
              update={this.props.userCheck}
              distractionCount={this.props.distractionCount}
              focuses={this.props.focuses}
            /> 
            {this.props.isSearching
              ?
              <a className="isSearching-wrapper">
                <ReactLoading name={'isSearching'} type={'SpinningBubbles'} color={'black'} height={'40px'} width={'40px'} />
              </a>
            : <div>
                { this.props.focuses.map( (item, index) => { 
                    if(!item.hidden){
                      return( <div key={index}>
                        <Pomodoro dateTag={item.dateTag}
                            percentComplete={item.percentComplete}
                            mins={item.mins}
                            isComplete={item.isComplete}
                            date={item.date}
                            timeKey={item.key}
                            reason={item.reason}
                            distraction={item.distraction}
                            onSelect={this.editPomodoro}
                            options={this.props.options} />
                      </div>)
                    } else{
                      return null
                    }
                  }
                )}
              </div>
            }
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
      focuses: state.focusHandler.focus,
      counts: state.focusHandler.counts,
      isSearching: state.focusHandler.isSearching,
      options: state.focusHandler.options,
      userName: state.focusHandler.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      userCheck: (userName) => dispatch( userCheck(userName) ),
      updateDistraction: (userName, key, distraction) => dispatch(updateDistraction(userName, key, distraction)),
      distractionCount: (focuses) => dispatch(distractionCount(focuses)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
