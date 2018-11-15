import React, { Component } from 'react';
import InfoIcon from "./InfoIcon" 
import Overlay from "./Overlay"

// for info toggle
const Info = () => { return <div className="info">more info</div>}

class Title extends Component {
  constructor(props){
    super(props);

    this.state = {
      isInfoClicked :false,
    };

    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  toggleOverlay(){
    console.log("toggling");
    this.setState( {isInfoClicked:!this.state.isInfoClicked})
  }

  render() {
    return (
      <div className="Title">
        <div className="title"
          onClick={this.showOverlay}>
          ProductivityVis  
          <InfoIcon 
            onClick={this.toggleOverlay}
          />
        </div>
        {this.state.isInfoClicked ?
          <Overlay 
            toggleOverlay={this.toggleOverlay}
          />
          : null}
      </div>
    );
  }
}
export default Title;
