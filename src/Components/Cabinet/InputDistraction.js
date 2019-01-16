import React, { Component } from 'react'
import { formatDateTime } from '../../Assets/Time'
import {connect} from 'react-redux'
import { createNewOption } from '../../ReduxActions/FocusActions';

class InputDistraction extends Component {
  constructor(props){
      super(props);

      this.state = {
          selected : null,
          newOption: null
      }

      this.selectionMade = this.selectionMade.bind(this)
      this.saveOption = this.saveOption.bind(this)
      this.cancelOption = this.cancelOption.bind(this)
      this.inputChange = this.inputChange.bind(this)
  }
  
  inputChange(event){
    this.setState( { newOption: event.target.value } )
  }

  saveOption( ){
    let input = this.state.newOption.trim();
    if(this.props.options.indexOf(input) === -1){
      this.props.createNewOption('username', input)
      this.selectionMade(null, input)
    }
  }

  cancelOption(){
    this.setState({selected:null, newOption:null})
  }

  selectionMade(event, customInput = ')'){
    console.log(event);
    let selected;
    if ( event === null){
      selected = customInput;
    } else {
      selected = event.target.value
    }
    if(selected !== 'Other'){
      this.props.onSelect(this.props.timeKey, selected);
      this.setState({ selected: selected})
    } else if (event.target.value === "Other"){
      this.setState({selected: "Other"})
    }
  }

  render() {
    let distractionStyle;
    const { selected } = this.state;
    const { distraction, isComplete, date, options } = this.props

    if(this.props.distraction){
      distractionStyle += " distractionSelected";
    }
    return (
      <div>
          { !isComplete ?
              <div className="datetime reasonText">

                <div className="focusTimeComplete"> 
                  {formatDateTime(new Date( date ))} 
                </div>
                
                <div className="DistractionType">
                  { selected  !== 'Other' && distraction !== "Other"
                  ?<div> 
                      <select className={distractionStyle} 
                              value={this.props.distraction}
                              onChange={this.selectionMade}>

                          { options.map( (item) => <option key={item} value={item}>{item}</option> )}

                      </select>
                    </div>
                  : <div>
                      <input type="text" onChange={this.inputChange}/> 
                        <button onClick={this.saveOption}>
                            Save
                        </button>
                        <button onClick={this.cancelOption}>
                          Cancel
                        </button>
                      </div>
                  }
                </div>
              </div>
            : null}
        
      </div>
    )
  }
}

const mapPropsToState = (state) => {
  return {
    options: state.focusHandler.options
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      createNewOption: (userName, option) => dispatch( createNewOption(userName, option) ),
  };
}

export default connect(mapPropsToState, mapDispatchToProps)(InputDistraction);