import React, { Component } from 'react';
// import InfoIcon from "./InfoIcon" 

class Overlay extends Component {
  constructor(props){
    super(props);

    this.state = {
      isInfoClicked :true,
    };
  }

  render() {
    return (
      <div className="Overlay opacityLow">
        <div className="overlayContentWrapper">
          <div className="overlayContent">

            <div className="remove"
              onClick={this.props.toggleOverlay}
            >
              x
            </div>

            <p className="smTitle">ProductivityVis</p>

            <p>
              ProductivityVis helps you focus on task. ProducitivityViz visualizes
              speriods of concentration both sucessful and uncsucessfull. By adding
              up the sucessful intervals, you can get a measure of how productive 
              a day was.
            </p>

            <p>
              This method of monitoring concentration follows the Pomodoro Method. For
              the method to work the best, you should hit reset after each and every distraction
              with any level of distraction.
            </p>
            
            <p>
              Built by Michael Fernandes using React and D3.js. Questions: mfern93@gmail.com
            </p>
          </div>

        </div>
      </div>
    );
  }
}

export default Overlay;
