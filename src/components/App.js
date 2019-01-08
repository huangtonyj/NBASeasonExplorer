import React, { Component } from 'react'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      data: {},
      // selectedTeams: new Set(),
      homeOrAway: 'both',
      plotData: {}
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

        if (result[visitorTeam]) {
          result[visitorTeam][date] = {
            points: visitorPts,
            homeOrAway: 'visitor'
          };
        } else {
          result[visitorTeam] = {
            [date]: {
              points: visitorPts,
              homeOrAway: 'visitor'
            }
          };
        }

        if (result[homeTeam]) {
          result[homeTeam][date] = {
            points: homePts,
            homeOrAway: 'home'
          };
        } else {
          result[homeTeam] = {
            [date]: {
              points: homePts,
              homeOrAway: 'home'
            }
          };
        }
      }

      delete result[undefined] // bad data?
      return result;
    }
    
    this.setState({data: parseData(event.target.value)});
  }

  handleTeamSelect(team) {
    // const selectedTeams = this.state.selectedTeams
    
    // selectedTeams.has(team) ? selectedTeams.delete(team) : selectedTeams.add(team)
    // this.setState({selectedTeams: selectedTeams});

    let plotData = this.state.plotData;

    if (plotData[team]) {
      delete plotData[team]
    } else {
      plotData = Object.assign(plotData, {[team]: this.state.data[team]});
    }

    this.setState({plotData: plotData});
  }

  render() {
    console.log(this.state);
    

    const homeOrAwayRadioBtns = (
      <div>
        <input type="radio" name="homeOrAway" 
          value="both" 
          checked={this.state.homeOrAway === "both" ? "checked" : ""}
          onChange={() => this.setState({homeOrAway: "both"})}
        />Both

        <input type="radio" name="homeOrAway" 
          value="away" 
          checked={this.state.homeOrAway === "home" ? "checked" : ""}
          onChange={() => this.setState({homeOrAway: "home"})}
        />Home

        <input type="radio" name="homeOrAway" 
          value="away" 
          checked={this.state.homeOrAway === "away" ? "checked" : ""}
          onChange={() => this.setState({homeOrAway: "away"})}
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

    return (
      <div>
        <h1> Basketball Season Explorer </h1>

        <textarea 
          rows = "2"
          cols = "50"
          placeholder="Input data here"
          onChange={(event) => this.handleDataInput(event)}
        >
        </textarea>

        {homeOrAwayRadioBtns}

        {teamsCheckBox}

      </div>
    )
  }
}
