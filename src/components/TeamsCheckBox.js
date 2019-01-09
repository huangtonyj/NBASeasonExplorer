import React from 'react'

export default function TeamsCheckBox({data, handleTeamSelect}) {

  const teamsCheckBox = Object.keys(data).map(team => {
    return (
      <div key = {team} >
        <input
          type = "checkbox"
          name = {team}
          value = {team}
          onChange = {(e) => handleTeamSelect(e.target.value)}
        />{team}
      </div>
    )
  }); 

  return (
    <div>
      {teamsCheckBox}
    </div>
  )
}
