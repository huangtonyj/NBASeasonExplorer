import React, { Component } from 'react';
// import {LineChart, XAxis, YAxis, Line, Legend} from 'recharts';
import {ScatterChart, XAxis, YAxis, Scatter, Legend} from 'recharts';

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

  handleHomeOrAwayRadioBtns(e) {
    this.setState({homeOrAway: e.target.value}, () => this.updatePlotData());
  }

  handleTeamSelect(team) {
    const selectedTeams = this.state.selectedTeams
    selectedTeams.has(team) ? selectedTeams.delete(team) : selectedTeams.add(team)
    this.setState({selectedTeams: selectedTeams}, () => this.updatePlotData());
  }

  updatePlotData() {
    let plotData = {};

    Array.from(this.state.selectedTeams).forEach(team => {
      plotData = Object.assign(plotData, {[team]: this.state.data[team]});
    });
    
    // this.state.selectedTeams.forEach((team) => { 
    //   switch (this.state.homeOrAway) {
    //     case 'home':
    //       this.state.data[team].forEach(game => {
    //         if (!plotData[game.date]) {plotData[game.date] = {};}
    //         if (game.homeOrAway === "home") {
    //           plotData[game.date] = Object.assign( plotData[game.date], {[team]: game.pts})
    //         }
    //       })
    //       break;
    //     case 'away':
    //       plotData[team] = this.state.data[team].away;
    //       break;
    //     default:          
    //       this.state.data[team].forEach(game => {
    //         if (!plotData[game.date]) {plotData[game.date] = {};}
    //         plotData[game.date] = Object.assign( plotData[game.date], {[team]: game.pts})
    //       })
    //     }
    // })
    
    // plotData = Object.keys(plotData).map((date) => Object.assign({date: date}, plotData[date]));
    // plotData = plotData.sort(el => el.date)

    this.setState({ plotData: plotData });
  }

  render() {
    console.log('App State', this.state);

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

    // const lines = Array.from(this.state.selectedTeams).map((team) => {
    //   return (
    //     <Scatter
    //       key={team}
    //       type="monotone"
    //       // stroke="#8884d8"
    //       dataKey={team}
    //     />
    //   )
    // });
    const scatters = Array.from(this.state.selectedTeams).map((team) => {
      return (
        <Scatter
          name={team}
          data={this.state.plotData[team]}
          fill="#8884d8"
          line shape="cross"
        />
      )
    });

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

        <ScatterChart
          width={700}
          height={600}
        >

          <XAxis dataKey="date" />
          <YAxis dataKey="pts"/>
          <Legend/>

          {scatters}
          
        </ScatterChart>

      </div>
    )
  }
}
