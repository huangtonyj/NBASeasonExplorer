import React, { Component } from 'react';
import {ScatterChart, XAxis, YAxis, Scatter, Legend} from 'recharts';
import moment from 'moment';
import DataInput from './DataInput';
import HomeOrAwayRadioBtns from './HomeOrAwayRadioBtns';
import TeamsCheckBox from './TeamsCheckBox';

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

    this.setState({data: parseData(event.target.value)}, () => this.updatePlotData());
  }

  handleHomeOrAwayRadioBtns = (e) => {
    this.setState({homeOrAway: e.target.value}, () => this.updatePlotData());
  }

  handleTeamSelect = (team) => {
    const selectedTeams = this.state.selectedTeams
    selectedTeams.has(team) ? selectedTeams.delete(team) : selectedTeams.add(team)
    this.setState({selectedTeams: selectedTeams}, () => this.updatePlotData());
  }

  updatePlotData() {
    let plotData = {};

    Array.from(this.state.selectedTeams).forEach(team => {
      const homeOrAway = this.state.homeOrAway;
      let filteredData = this.state.data[team];
      if (homeOrAway !== 'both') {
        filteredData = filteredData.filter(game => game.homeOrAway === homeOrAway);
      }
      plotData = Object.assign(plotData, { [team]: filteredData});
    });

    this.setState({ plotData: plotData });
  }

  render() {
    console.log('App State', this.state);

    const scatters = Array.from(this.state.selectedTeams).map((team) => {
      return (
        <Scatter
          key={team}
          name={team}
          data={this.state.plotData[team]}
          fill="#8884d8"
          line
        />
      )
    });

    return (
      <div>
        <h1> Basketball Season Explorer </h1>

        <DataInput handleDataInput = {this.handleDataInput}/>

        <HomeOrAwayRadioBtns
          homeOrAway={this.state.homeOrAway}
          handleHomeOrAwayRadioBtns = {this.handleHomeOrAwayRadioBtns}
        />

        <TeamsCheckBox
          data={this.state.data}
          handleTeamSelect={this.handleTeamSelect}
        />

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

      </div>
    )
  }
}
