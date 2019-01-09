import React from 'react'

export default function HomeOrAwayRadioBtns({
  homeOrAway, handleHomeOrAwayRadioBtns
}) {  
  return (
    <div>
      <input type="radio" name="homeOrAway" 
        value="both" 
        checked={homeOrAway === "both" ? "checked" : ""}
        onChange={(e) => handleHomeOrAwayRadioBtns(e)}
        />Both

      <input type="radio" name="homeOrAway" 
        value="home" 
        checked={homeOrAway === "home" ? "checked" : ""}
        onChange={(e) => handleHomeOrAwayRadioBtns(e)}
        />Home

      <input type="radio" name="homeOrAway" 
        value="away" 
        checked={homeOrAway === "away" ? "checked" : ""}
        onChange={(e) => handleHomeOrAwayRadioBtns(e)}
      />Away
    </div>
  )
}
