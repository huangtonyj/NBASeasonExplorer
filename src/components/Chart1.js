import React from 'react'

export default function Chart({plotData}) {

  // if (Object.keys(plotData).length === 0) { return null;}

  // console.log(plotData);
  

  // for (let team in plotData) {
  //   console.log(team);
  // };

  // const printOut = Object.keys(plotData).map((team) => (
  //   <li key={team}>
  //     <h3>{team}</h3>
  //     {plotData[team].join('|')}
  //     {/* {Object.values(plotData[team]).join('|')} */}
  //   </li>
  //   )
  // );
  // const printOut = Object.keys(plotData).map((team) => (
  //   <li key={team}>
  //     <h3>{team}</h3>
  //     {Object.values(plotData[team]).join('|')}
  //   </li>
  //   )
  // );

  console.log(plotData);
  

  return (
    <div>
      <ul>
        {/* {printOut} */}
      </ul>
    </div>
  )
}
