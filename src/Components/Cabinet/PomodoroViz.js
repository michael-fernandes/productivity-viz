import { Component } from 'react';
import * as ReactFauxDOM from 'react-faux-dom'
import * as d3 from 'd3';
import { withSize } from 'react-sizeme';

const barHeight = 40;

function isCompleteColor(isComplete){
  if(isComplete){
    return "green";
  } else{
    return "red";
  }
}

class PomodoroViz extends Component {
  constructor(props){
    super(props);

    this.makeFauxD3 = this.makeFauxD3.bind(this);
  }

  makeFauxD3(){
    let { width } = this.props.size;
    var fauxSvg = ReactFauxDOM.createElement('div');  
    
    var toolTip = d3.select(".tool").append("div")	
                          .attr("class", "tooltip")	

    let svg = d3.select(fauxSvg).append("svg")
                              .attr('margin', 0)
                              .attr('padding', 0)
                              .attr('width', width)
                              .attr('height', barHeight);
    

    svg.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", barHeight)
          .attr("fill", "#f2f2f2");

						 
    svg.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width * this.props.percentComplete )
          .attr("height", barHeight)
          .attr("fill", isCompleteColor(this.props.isComplete));
    
    let minsText = svg.append('text')
                        .attr("y", (barHeight / 2) + 4) // Todo: programatically generate this
                        .attr("font-weight", 400)
                        .attr("font-size", "90%")
                        .text( (this.props.mins + "m"));

    if(this.props.percentComplete > 0.1 ){
        minsText.attr("x", width * this.props.percentComplete - 5)
          .attr("text-anchor", "end")
          .attr("fill", "white");
    }else{
        minsText.attr("x", 5)
          .attr("text-anchor", "start")
          .attr("fill", "darkGrey");
    }

    /*let minsText = svg.append('text')
                        .attr("x", handPosition)
                        .attr("y", (barHeight / 2) + 3) // Todo: programatically generate this
                        .attr("text-anchor", "end")
                        .attr("fill", "white")
                        .attr("font-weight", 400)
                        .attr("font-size", "90%")
                        .text( (this.props.mins + "m"));*/

    return fauxSvg;
  }

  render() {
    let FauxSvg = this.makeFauxD3();

    return (
      FauxSvg.toReact()
    );
  }
}

//Leaving this function here, this is best practice but won't pick up differences in faux dom
function componentWillMount_OLD(){
    let { width, height } = this.props.size
    let faux = this.props.connectFauxDOM('div', 'chart')
    //var node = ReactFauxDOM.createElement('svg');
    let svg = d3.select(faux).append("svg")
                                  .attr('margin', 0)
                                  .attr('padding', 0)
                                  .attr('width', width)
                                  .attr('height', barHeight);
                              
    svg.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width)
          .attr("height", barHeight)
          .attr("fill", "#f2f2f2");
    
    svg.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", width * this.props.percentComplete)
          .attr("height", barHeight)
          .attr("fill", isCompleteColor(this.props.isComplete));
    
    svg.append('text')
          .attr("x", 10)
          .attr("y", 10)
          .text(function(d) { return "charge"; })
          .attr("fill", "white");
  }


  export default withSize()(ReactFauxDOM.withFauxDOM(PomodoroViz));
