
import '../styles/App.css';
import React from 'react'
import {Character, Players, getPlayersFromServer} from './Enums'

function Ranking() {
  const [Player, setPlayers] = React.useState([])
  React.useEffect(
    () => {
      getPlayersFromServer(setPlayers)
    },
    []
  )
  
  return (
    <div className="Ranking">
      <h3>Rankings</h3>
      <ol>
        {Players.map((p, i)=>{

          return <li>{p[1]}-{p[2]}</li>
        })}
      </ol>
      <button onClick={()=>getPlayersFromServer(setPlayers)}>Reload Rankings</button>
    </div>
  );
}

function OtherSidebar(props){
  return(
    <div className='otherSidebar'>
    <h3>other side bar</h3>
  </div>
    
  )
}

export {Ranking, OtherSidebar}
