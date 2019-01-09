import React, { Component } from 'react';
import * as d3 from "d3";
import Line from './Line';

export default class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graph: "",
      container: "",
      width: 500,
      height: 500,
      x: NaN,
      y: NaN,
      // data: [],
      margin: {}
    }
  }

  componentDidMount() {
    // window.addEventListener('resize', this.resize);

    const graph = d3.select("#chart");
    // const container = d3.select("#graphic");

    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    };

    this.setState({graph: graph, margin: margin})

    // var containerBB = container.node().getBoundingClientRect();

    // var graphBB = graph.node().getBoundingClientRect();

    // let chartWidth = getChartSize(container)[0];
    // let chartHeight = getChartSize(container)[1];

    // const _this = this;

    // // let formatDate = d3.time.format("%d-%b-%y");

    // function type(d) {
    //   d.date = formatDate.parse(d.date);
    //   d.close = +d.close;
    //   return d;
    // }

    // d3.tsv("data4.tsv", type, function (error, data) {
    //   if (error) throw error;

    //   _this.setState({
    //     graph: graph,
    //     // container: container,
    //     // chartWidth: chartWidth,
    //     // chartHeight: chartHeight,
    //     data: this.props.plotData,
    //     margin: margin
    //   });
    // });
  }


  render() {
    // console.log('Chart', this.props);
    // const {width, height, margin, data} = this.state;
    const {width, height, margin} = this.state;
    const data = this.props.plotData;
    
    const Lines = Object.keys(data).map((team) => {
      return (
        <Line
        key={team}
        width={width} 
        height={height} 
        margin={margin} 
        team={team}
        data={data[team]}
        />
      )
    });

    return (
      <div id="chart">
        <svg height={height} width={width} >
          <g transform="translate(50,20)">
            {/* <AxisX width={width} height={height} margin={margin} data={data}/>
            <AxisY width={width} height={height} margin={margin} data={data}/> */}
            {/* <Line 
              width={width} 
              height={height} 
              margin={margin} 
              data={data}
            /> */}
            {Lines}
          </g>
        </svg>
      </div>
    )
  }
}
