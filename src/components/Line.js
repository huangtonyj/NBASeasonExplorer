import React from 'react'
import * as d3 from "d3";

export default function Line(props) {

  console.log('Line', props);

  const {width, height, margin, data} = props;
  // console.log('Line', width, height, margin, data);
  
  var x = d3.scaleTime()
    .range([0, width]);

  var y = d3.scaleLinear()
    .range([height, 0]);

  var line = d3.line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.pts);
    });

  data.forEach(function (d) {
    x.domain(d3.extent(data, function (d) {
      return d.date;
    }));
    y.domain(d3.extent(data, function (d) {
      return d.pts;
    }));
  });

  var newline = line(data);
  console.log(data, newline);


  return (
    <div>
      <path className="line" d={newline}></path>
      Hello from Line
    </div>
  )
}
