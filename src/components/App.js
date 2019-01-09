import React, { Component } from 'react';
import {LineChart, XAxis, YAxis, Line} from 'recharts';
// import Chart from './Chart';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      data: {},
      selectedTeams: new Set(),
      homeOrAway: 'both',
      plotData: []
    }
  }

  handleDataInput(event) {
    function parseData(data) {
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
        
        // if (!result[visitorTeam]) { result[visitorTeam] = { home: [], away: [] }}
        // if (!result[homeTeam]) { result[homeTeam] = { home: [], away: [] }}
      
        // result[visitorTeam]['away'].push({date: new Date(date), pts: parseInt(visitorPts)});
        // result[homeTeam]['home'].push({date: new Date(date), pts: parseInt(homePts)});

        if (!result[visitorTeam]) { result[visitorTeam] = { home: {}, away: {} }}
        if (!result[homeTeam]) { result[homeTeam] = { home: {}, away: {} }}
      
        result[visitorTeam]['away'][date] = parseInt(visitorPts);
        result[homeTeam]['home'][date] = parseInt(homePts);
        
      }

      delete result[undefined] // bad data?
      return result;
    }

    this.setState({data: parseData(event.target.value)}, () => this.updatePlotData());
  }

  handleHomeOrAwayRadioBtns(e) {
    this.setState({homeOrAway: e.target.value}, () => this.updatePlotData());
  }

  handleTeamSelect(team) {
    const selectedTeams = this.state.selectedTeams
    selectedTeams.has(team) ? selectedTeams.delete(team) : selectedTeams.add(team)
    this.setState({selectedTeams: selectedTeams}, () => this.updatePlotData());
  }

  updatePlotData() {
    const theData = {};
    // let theData;
    
    this.state.selectedTeams.forEach((team) => { 
      switch (this.state.homeOrAway) {
        case 'home':
          theData[team] = this.state.data[team].home;
          break;
        case 'away':
          theData[team] = this.state.data[team].away;
          break;
        default:
          theData[team] = this.state.data[team].home.concat(this.state.data[team].away);
          // theData = this.state.data[team].home.concat(this.state.data[team].away);

          break;
        }
    })

    this.setState({ plotData: theData });
  }

  render() {
    console.log('App State', this.state);
    // console.log(this.state.plotData);   

    const homeOrAwayRadioBtns = (
      <div>
        <input type="radio" name="homeOrAway" 
          value="both" 
          checked={this.state.homeOrAway === "both" ? "checked" : ""}
          onChange={(e) => this.handleHomeOrAwayRadioBtns(e)}
          />Both

        <input type="radio" name="homeOrAway" 
          value="home" 
          checked={this.state.homeOrAway === "home" ? "checked" : ""}
          onChange={(e) => this.handleHomeOrAwayRadioBtns(e)}
          />Home

        <input type="radio" name="homeOrAway" 
          value="away" 
          checked={this.state.homeOrAway === "away" ? "checked" : ""}
          onChange={(e) => this.handleHomeOrAwayRadioBtns(e)}
        />Away
      </div>
    );

    const teamsCheckBox = Object.keys(this.state.data).map(team => {
      return (
        <div key = {team} >
          <input
            type = "checkbox"
            name = {team}
            value = {team}
            onChange = {(e) => this.handleTeamSelect(e.target.value)}
          />{team}
        </div>
      )
    }); 
    
    // const lines = Object.keys(this.state.plotData).map((team) => {
    //   return (
    //     < Line
    //       type = "monotone"
    //       // stroke={null}
    //       // strokeWidth="2"
    //       // dot={false}
    //       stroke = "#8884d8"
    //       dataKey = "pts"
    //     />
    //   )
    // });

    return (
      <div>
        <h1> Basketball Season Explorer </h1>

        <textarea 
          rows = "2"
          cols = "30"
          placeholder="Input data here"
          onChange={(e) => this.handleDataInput(e)}
        >
        </textarea>

        {homeOrAwayRadioBtns}

        {teamsCheckBox}

        {/* <Chart 
          plotData={this.state.plotData}
        /> */}

        <LineChart
          width={700}
          height={600}
          data={this.state.plotData}>

          <XAxis dataKey="date"/>
          <YAxis/>

          <Line
            type="monotone"
            stroke = "#8884d8"
            dataKey="pts"
          />

          {/* {lines} */}

        </LineChart>

      </div>
    )
  }
}
