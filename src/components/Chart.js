import React from 'react'
import {ScatterChart, XAxis, YAxis, Scatter, Legend} from 'recharts';
import moment from 'moment';

export default function Chart({selectedTeams, plotData}) {
  const scatters = Array.from(selectedTeams).map((team) => {
    return (
      <Scatter
        key={team}
        name={team}
        data={plotData[team]}
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
