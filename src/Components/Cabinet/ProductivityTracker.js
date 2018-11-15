import React, { Component } from 'react';

//import { formatDateTime } from '../../Assets/Time';

class ProductivtyTracker extends Component {
  render() {
    return (
        <div className="ProductivityTracker">
          <div className="ProductivityTitle">
            Overall Stats
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
