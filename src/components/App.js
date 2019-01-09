import React, { Component } from 'react';
import DataInput from './DataInput';
import HomeOrAwayRadioBtns from './HomeOrAwayRadioBtns';
import TeamsCheckBox from './TeamsCheckBox';
import Chart from './Chart';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      data: {},
      selectedTeams: new Set(),
      homeOrAway: 'both',
    }
  }

  // Parse input data
  handleDataInput = (event) => {
    function parseData(data) {
      data = data.split('\n');

      const result = {};
      let rowData, date, visitorTeam, visitorPts, homeTeam, homePts;

      for (let i = 1; i < data.length; i++) {
        rowData = data[i].split(',');
        date = new Date(rowData[0]).getTime();
        visitorTeam = rowData[2];
        visitorPts = rowData[3]
        homeTeam = rowData[4];
        homePts = rowData[5];

        if (!result[visitorTeam]) { result[visitorTeam] = []}
        if (!result[homeTeam]) { result[homeTeam] = []}

        result[visitorTeam].push({date: date, pts: visitorPts, homeOrAway: 'away', opponent: homeTeam}) 
        result[homeTeam].push({ date: date, pts: homePts, homeOrAway: 'home', opponent: visitorTeam}) 
      }

      delete result[undefined] // bad data?
      return result;
    }

    this.setState({data: parseData(event.target.value)});
  }

  // Set filter options
  handleHomeOrAwayRadioBtns = (e) => { this.setState({homeOrAway: e.target.value}); }

  // Checkboxes for team selection
  handleTeamSelect = (team) => {
    const selectedTeams = this.state.selectedTeams
    selectedTeams.has(team) ? selectedTeams.delete(team) : selectedTeams.add(team)
    this.setState({selectedTeams: selectedTeams});
  }

  render() {
    return (
      <div id='App'>
        

        <div className="controls">
        <DataInput handleDataInput = {this.handleDataInput}/>

        <HomeOrAwayRadioBtns
          homeOrAway={this.state.homeOrAway}
          handleHomeOrAwayRadioBtns = {this.handleHomeOrAwayRadioBtns}
          />

        <TeamsCheckBox
          data={this.state.data}
          handleTeamSelect={this.handleTeamSelect}
          />
        </div>

        <Chart
          selectedTeams={this.state.selectedTeams}
          homeOrAway={this.state.homeOrAway}
          data={this.state.data}
        />

      </div>
    )
  }
}
