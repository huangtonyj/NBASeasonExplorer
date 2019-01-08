import React, { Component } from 'react'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      data: {},
      selectedTeam: new Set(),
      selectedType: 'both'
    }
  }

  handleDataInput(event) {
    this.setState({data: this.parseData(event.target.value)});
    // this.setState({selectedTeam: ['Boston Celtics, Golden State Warriors']})
    console.log(this.state.data);
  }

  parseData(data) {
    data = data.split('\n');

    const result = {};
    let rowData, date, visitorTeam, visitorPts, homeTeam, homePts;

    for (let i = 1; i < data.length; i++) {
      rowData = data[i].split(',');
      date = rowData[0];
      visitorTeam = rowData[2];
      visitorPts = rowData[3]
      homeTeam = rowData[4];
      homePts = rowData[5];

      if (result[visitorTeam]) {
        result[visitorTeam][date] = {points: visitorPts, visitorOrHome: 'visitor'};
      } else {
        result[visitorTeam]= {[date]: {points: visitorPts, visitorOrHome: 'visitor'}};
      }

      if (result[homeTeam]) {
        result[homeTeam][date] = {points: homePts, visitorOrHome: 'home'};
      } else {
        result[homeTeam]= {[date]: {points: homePts, visitorOrHome: 'home'}};
      }
    }

    return result;
  }


  render() {


    return (
      <div>
        <h1> Basketball Season Explorer </h1>

        <textarea 
          rows = "1"
          cols = "50"
          placeholder="Input data here"
          onChange={(event) => this.handleDataInput(event)}
        >
        </textarea>

        {teams}

      </div>
    )
  }
}
