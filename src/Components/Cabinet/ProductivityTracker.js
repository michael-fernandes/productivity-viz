import React, { Component } from 'react';
import Refresh from './Refresh'
//import { formatDateTime } from '../../Assets/Time';

class ProductivtyTracker extends Component {
  constructor(props){
    super();

    this.update = this.update.bind(this);
    this.generateReport = this.generateReport.bind(this)
  }

  update(){
    this.props.update(this.props.userName)
  }
  
  generateReport(){
    this.props.distractionCount(this.props.focuses)
  }

  render() {
    return (
        <div className="ProductivityTracker">
          <div className="ProductivityTitle">
            Overall Stats
            <div className="refreshButton" onClick={this.update}>
              <Refresh />
            </div>
          </div>
          <div className="report" onClick={this.generateReport}>
            Generate Report
          </div>
          <div className="productivityStats">
            <div className="total">
                <span className="productivityNum">{this.props.incomplete + this.props.complete}</span>
                <br className="productivityBreak"/>
                <span className="productivityLabel">Total</span>
            </div>
            <div className="complete">
              <span className="productivityNum">{this.props.complete}</span>
              <br className="productivityBreak"/>
              <span className="productivityLabel">Complete</span>
            </div>
            <div className="incomplete">
              <span className="productivityNum">{this.props.incomplete}</span>
              <br className="productivityBreak"/>
              <span className="productivityLabel">Incomplete</span>
            </div>
            
          </div>
        </div>
    );
  }
}

export default ProductivtyTracker;
