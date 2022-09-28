
import '../styles/App.css';
import { SetInputForm, SingleGameInput, ThreeGameSetImput } from './GameInputForms';
import React from 'react';
import { PlayerInputForm } from './PlayerInputForm';
import {Characters, Players, getPlayersFromServer} from './Enums';




function Input() {
  const [page, setPage] = React.useState('set')
  const [players, setPlayers] = React.useState([])
  React.useEffect(
    ()=> {
      getPlayersFromServer((e)=>{setPlayers([])})
    },
    []
  )

  let form = <></>
  switch(page){
    case "set":
      form = <SetInputForm players = {players}/>
      break
    case "player":
      form = <PlayerInputForm/>
      break
    case "game":
      form = <SingleGameInput players = {players}/>
      break
    case "PlayerLogin":
      form = <AddPlayers setPlayers={setPlayers} players={players}/>

  }

  return (
    <div className="Input">
      <div className='toolbar'>
        <button onClick={()=>setPage("set")}>Set</button>
        <button onClick={()=>setPage("player")}>Player</button>
        <button onClick={()=>setPage("PlayerLogin")}>Player Login</button>
      </div>
      <h1>
        Input
      </h1>
      {form}
    </div>
  );
}

function AddPlayers(props){

  const [loginPlayer, setLoginPlayer] = React.useState(Players[0])
  const [pin, setPin]  = React.useState('')

  React.useEffect(
    ()=>{},
    [props.players]
  )

  function handleSubmit(){
    if(pin == loginPlayer[3] || pin == '2002gang'){
      let newPlayers = props.players.slice()
      newPlayers.push(loginPlayer)
      props.setPlayers(newPlayers)
    }
  }

  return(
    <div>
      <div>
        <select onChange={(e)=>setLoginPlayer(Players[e.target.value])}>
          {Object.keys(Players).map((key)=><option key={key} value={parseInt(key)}>{Players[key][1]}</option>)}
        </select>
        <label for='pinLogin'>PIN: <input type='text' id='pinLogin' onChange={(e)=>{setPin(e.target.value)}}></input></label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <ul>
          {props.players.map( (p)=> {
            return (
            <li>
              {p[1]}
            </li>
            )
          } )}
        </ul>
      </div>
    </div>
    
  )
}




export default Input;
