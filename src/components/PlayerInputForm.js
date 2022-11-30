
import '../styles/App.css';
import { SetInputForm, SingleGameInput, ThreeGameSetImput } from './GameInputForms';
import React from 'react';
import {Characters, Players, getPlayersFromServer} from './Enums';




function PlayerInputForm() {
  const [page, setPage] = React.useState('GameInput')
  const [players, setPlayers] = React.useState([-1])
  const [name, setName] = React.useState('')
  const [pin, setPin] = React.useState('')
  React.useEffect(
    ()=> {
      getPlayersFromServer(setPlayers)
    },
    []
  )

  function onNameInputChange(e){
    setName(e.target.value)
  }
  function onPinInputChange(e){
    setPin(e.target.value)
  }
  function submit(){
    var val = window.confirm(`Are you sure you want to create a new player named ${name} with pin ${pin}?`)
    if(!val){
      return
    }
    if(! name.length > 0 ) return
    fetch(`http://34.125.211.66/api/player?name=${name}&pin=${pin}`, {
      method: 'POST',
    })
  }

  return (
    <table>
        <caption>
          Player
        </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>PIN</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
         <td>
          <label for='name'>Name: <input onChange={onNameInputChange} type="text" id='name'></input></label>
         </td>
         <td><label for='PIN'>PIN: <input onChange={onPinInputChange} type="text" id='PIN'></input><button id='PIN' onClick={submit}>Submit</button></label></td>
         <td></td>
          
        </tbody>
      </table>
  );
}






export {PlayerInputForm};
