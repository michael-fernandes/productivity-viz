import React, { Component } from 'react'
import { formatDateTime } from '../../Assets/Time'

export default class InputDistraction extends Component {
  constructor(props){
      super(props);

      this.state = {
          selected : null,
          options : [null, "Social Media", "Phone", "Unexpected Event", "Other"],
          newOption: null

      }

      this.selectOption = this.selectOption.bind(this)
      this.selectionMade = this.selectionMade.bind(this)
      this.saveOption = this.saveOption.bind(this)
      this.cancelOption = this.cancelOption.bind(this)
      this.inputChange = this.inputChange.bind(this)
  }
  
  inputChange(event){
    this.setState( { newOption: event.target.value } )
  }

  saveOption( ){
    this.selectionMade(null);
  }

  cancelOption(){
    this.setState({selected:null, newOption:null})
  }

  selectionMade(event, custom = ')'){
    console.log(event);
    let input;
    if ( event === null){
      input = custom;
    } else {
      input = event.target.value
    }
    if(input !== 'Other'){
      this.props.onSelect(this.props.timeKey, input);
      this.setState({ selected: input})
    } else if (event.target.value == "Other"){
      this.setState({selected: "Other"})
    }
  }

  selectOption(select, active, index){
    if(active === select){
      return <option key={index} value={select} selected>{select}</option>
    } return <option key={index} value={select}>{select}</option>
  }

  render() {
    let distractionStyle;
    const { selected, options } = this.state;
    const { distraction, isComplete, date } = this.props

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
                  ?   <div> <select className={distractionStyle}
                              onChange={this.selectionMade}>
                          { options.map( (item, index) => this.selectOption(item, distraction, index)) }
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
