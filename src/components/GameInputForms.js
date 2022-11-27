import '../styles/App.css';
import React from 'react';
import {Characters, Players, getPlayersFromServer} from './Enums';



function SingleGameInput(props){
    const [state, setState] = React.useState({
        players:[{
          name: Players.None,
          character: Characters.None
        },
        {
          name: Players.None,
          character: Characters.None
        }]
      })

      let radioButtonName = 'game1'

      function handleSubmit(){
        chechGameValidity(state, radioButtonName)
      }
      return(
      <div disabled>
        <GameInputTable state={state} setState = {setState} radioButtonName = {radioButtonName}/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      )
}



function GameInputTable(props){
    function changeName(e, i){
      let newState = props.state
      newState.players[i].name = e.target.value;
      props.setState(newState)
    }
    function changeChar(e, i){
      let newState = props.state
      newState.players[i].character = e.target.value;
      props.setState(newState)
    }
  
    return(
      <table>
        <caption>
          Game
        </caption>
        <thead>
          <tr>
            <th>#</th>
            <th>W/L</th>
            <th>Player</th>
            <th>Character</th>
          </tr>
        </thead>
        <tbody>
          <GameInputTableRow radioButtonName = {props.radioButtonName} changeChar={changeChar} changeName={changeName} index={0}/>
          <GameInputTableRow radioButtonName = {props.radioButtonName} changeChar={changeChar} changeName={changeName} index={1}/>
          
        </tbody>
      </table>
    )
  }

  function GameInputTableRow(props){
    return(
      <tr>
        <td>
          {props.index+1}
        </td>
        <td>
          <input type='radio' value={props.index} name={props.radioButtonName}></input>
        </td>
        <td>
          <select onChange={(e)=>{props.changeName(e, props.index)}}>
          <option  value={0}>None</option>
            {Object.keys(Players).map((key)=><option key={key} value={parseInt(key)}>{Players[key][1]}</option>)}
          </select>
        </td>
        <td>
          <select onChange={(e)=>{props.changeChar(e, props.index)}}>
            {Object.keys(Characters).map((key)=><option key={key} value={Characters[key]}>{key.replaceAll("_", " ")}</option>)}
          </select>
        </td>
      </tr>
    )
  }


  function SetInputForm(props){
    const [state, setState] = React.useState({
        players:[{
          name: 0,
          characters:[
            Characters.Character,
            Characters.Character,
            Characters.Character
          ]
        },
        {
          name: 0,
          characters:[
            Characters.Character,
            Characters.Character,
            Characters.Character
          ]
        }]
      })
      const [scores, setScores] = React.useState([0,0])
      const [useThird, setUseThird] = React.useState(true)
      const [uncheck, setUncheck] = React.useState(false)

      if(uncheck){
        setUncheck(false)
      }

      function getWinnerArray(){
        let winnerArr = []
        let gameIndexes = [0,1]
        if(scores[0] + scores[1] == 3) gameIndexes.push(2)
        for(const index of gameIndexes){
          let selected = document.querySelector(`input[name="${index}"]:checked`)
          if(selected == null) continue
          winnerArr.push(selected.value)
        }
        return winnerArr
      }


      function onButtonClick(e){
        let newScores = [0,0]
        for(const index of [0,1]){
            let selected = document.querySelector(`input[name="${index}"]:checked`)
            if(selected == null) continue
            newScores[selected.value] += 1
        }
        if(newScores[0] == 2 || newScores[1] == 2){
            setScores(newScores)
            setUseThird(false)
            return
        }
        setUseThird(true)
        let selected = document.querySelector(`input[name="${2}"]:checked`)
        if(selected != null){
          newScores[selected.value] += 1
        }
        setScores(newScores)
      }

      async function registerSet(winnerIndex){
        let winnerArr = getWinnerArray()
        let games = []
        console.log(winnerArr)
        games = winnerArr.map(
          (winner, index) => {
            winner = parseInt(winner)
            return {
              p1: props.players[state.players[winner].name -1][0],
              p2: props.players[state.players[(winner + 1)%2].name -1][0],
  
              c1: state.players[winner].characters[index],
              c2: state.players[(winner + 1)%2].characters[index]
  
            }
          }
        )
        
        

        let body = {
          p1: props.players[state.players[winnerIndex].name -1][0],
          p2: props.players[state.players[(winnerIndex + 1)%2].name -1][0],
          games:games
        }
        console.log(body)
        await fetch('http://196.168.1.112:8000/set',
        {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(body)
        })

      }

      function handleSubmit(){
        console.log(scores)
        if(checkSetValidity()){
            let winnerIndex = calculateWinner()
            registerSet(winnerIndex)
        }
      }
      function checkSetValidity(){
        console.log(state.players)
        if(state.players[0].name == 0 || state.players[1].name == 0){
            alert("Enter Player Names")
            return false
        }
        if(scores[0] != 2 && scores[1] != 2){
          alert('Indicate Set Winner')
          return false
        }
        if(state.players[0].characters.slice(0, (scores[0] + scores[1]) == 3 ? 3 : 2).includes(Characters.Character)){
            alert('Enter Characters Used For Player 1')
            return false
        }
        if(state.players[1].characters.slice(0, (scores[0] + scores[1]) == 3 ? 3 : 2).includes(Characters.Character)){
            alert('Enter Characters Used For Player 2')
            return false
        }
        return true
    }
      function calculateWinner(){
        if(scores[0] != 2 && scores[1] != 2){
            return -1
        }
        if(state.players[0] == -1 || state.players[1] == -1) return
        console.log(state.players)
        console.log(scores)
        if(scores[0] == 2){
            return 0
        }
        return 1
    }



    function changeName(e, i){
        let newState = state
        newState.players[i].name = e.target.value;
        setState(newState)
      }
      function changeChar(e, i, game){
        let newState = state
        newState.players[i].characters[game] = e.target.value;
        setState(newState)
      }
    
      return(
        <div>            
        <table>
          <caption>
            Set
          </caption>
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Game 1</th>
              <th>Game 2</th>
              <th>Game 3</th>
            </tr>
          </thead>
          <tbody>
            <SetInputTableRow players = {props.players} uncheck={uncheck} useThird={useThird} winnerChange = {onButtonClick} changeChar={changeChar} changeName={changeName} index={0}/>
            <SetInputTableRow players = {props.players} uncheck={uncheck} useThird={useThird} winnerChange = {onButtonClick} changeChar={changeChar} changeName={changeName} index={1}/>
          </tbody>
        </table>
        <button onClick={handleSubmit}>Submit</button>
        </div>
      )
    }
  

function SetInputTableRow(props){

    let thirdConditions = props.useThird ? {} : {disabled : true}

    let unckeck = props.uncheck ? "unchecked" : ''

    console.log(props.players)

    return(
      <tr>
        <td>
          {props.index+1}
        </td>
        <td>
          <select onChange={(e)=>{props.changeName(e, props.index)}}>
          <option  value={0}>Player</option>
            {Object.keys(props.players).map((key)=><option key={key} value={parseInt(key)+1}>{props.players[key][1]}</option>)}
          </select>
        </td>
        <td>
          <select onChange={(e)=>{props.changeChar(e, props.index, 0)}}>
            {Object.keys(Characters).map((key)=><option key={key} value={Characters[key]}>{key.replaceAll("_", " ")}</option>)}
          </select>
          <input type='radio' {...unckeck} onChange={props.winnerChange} value={props.index} name={0}></input>
        </td>
        <td>
          <select onChange={(e)=>{props.changeChar(e, props.index, 1)}}>
            {Object.keys(Characters).map((key)=><option key={key} value={Characters[key]}>{key.replaceAll("_", " ")}</option>)}
          </select>
          <input type='radio' {...unckeck} onChange={props.winnerChange} value={props.index} name={1}></input>
        </td>
        <td>
          <select onChange={(e)=>{props.changeChar(e, props.index, 2)}}>
            {Object.keys(Characters).map((key)=><option key={key} value={Characters[key]}>{key.replaceAll("_", " ")}</option>)}
          </select>
          <input type='radio' {...unckeck} onChange={props.winnerChange} {...thirdConditions} value={props.index} name={2}></input>
        </td>
      </tr>
    )
  }


  function chechGameValidity(gameState, radioButtonName){
    console.log(Players)
    if(gameState.players[0].name == Players.None || gameState.players[0].character == Characters.None || gameState.players[1].name == Players.None || gameState.players[1].character == Characters.None){
        alert("must input value for all fields")
      }
      else if(gameState.players[0].name == gameState.players[1].name){
        alert('Players must have different names')
      }
      else if(document.querySelector(`input[name="${radioButtonName}"]:checked`) == null){
        alert("select winner")
      }
      else{
        let value = gameState.players[document.querySelector(`input[name="${radioButtonName}"]:checked`).value]
        alert(Players[value.name][1] + ' wins')
      }
  }
  function checkSetValidity(players, score){

    console.log(players)
    if(score[0] != 2 && score[1] != 2){
        alert('indicate winner')
        return
    }
    if(score[0] == 2){
        alert(Players[players[0].name-1][1])
        return
    }
    alert(Players[players[1].name-1][1])
}
  
  export {SingleGameInput, SetInputForm}