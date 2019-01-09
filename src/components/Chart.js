import React from 'react'
import {ScatterChart, XAxis, YAxis, Scatter, Legend} from 'recharts';
import moment from 'moment';

export default function Chart({selectedTeams, homeOrAway, data, plotData}) {

  const createPlotData = (data) => {
    let plotData = {};

    Array.from(selectedTeams).forEach(team => {

      let filteredData = data[team];
      if (homeOrAway !== 'both') {
        filteredData = filteredData.filter(game => game.homeOrAway === homeOrAway);
      }
      plotData = Object.assign(plotData, {
        [team]: filteredData
      });
    });

    return plotData;
  }

  const thePlotData = createPlotData(data);

  const scatters = Array.from(selectedTeams).map((team) => {
    return (
      <Scatter
        key={team}
        name={team}
        // data={plotData[team]}
        data={thePlotData[team]}
        fill="#8884d8"
        line
      />
    )
  });

  return (
    <ScatterChart width={700} height={600}>

      <XAxis
        dataKey='date'
        domain={['auto', 'auto']}
        name='Date'
        tickFormatter={(unixTime) => moment(unixTime).format('MMM Do YY')}
        type='number'
      />

      <YAxis dataKey="pts"/>

      <Legend/>

      {scatters}
      
    </ScatterChart>
  )
}
