
import { ReactDOM } from 'react';
import React from 'react';

import '../styles/App.css';
import { Ranking, OtherSidebar } from './Sidebars';
import Statistics from './Statistics';
import Input from './Input';

function App() {
  const [page, setPage] = React.useState('input');

  let inputSection = <Input setPage/>;
  if(page === 'statistics') {
    inputSection = <Statistics setPage/>;
  }
    
  return (
    <div className="App">
        <ToolBar setPage={setPage}/>
        <div className='mainSection'>
          <Ranking/>
          {inputSection}
          <OtherSidebar/>
        </div>

    </div>
  );
  
}


function ToolBar(props){
  return(
    <div className='toolbar'>
      
      <Svg/>
      <button onClick={()=>{props.setPage('input')}}>Input</button>
      <button onClick={()=>{props.setPage('statistics')}}>Statistics</button>
    </div>
  )
}

function Svg(props){
  const [animated, setAnimated] = React.useState(false);
  return(
    <svg 
      onMouseEnter={() => setAnimated(() => true)}
      onAnimationEnd={() => setAnimated(() => false)}
      className = {'smashLogo ' + (animated ? 'smashLogoAnimated' :'')} 
      viewBox='0 0 270 270' 
      onClick={()=>{alert('Home')}}
    >
        <clipPath id="c">
          <path d="m0,0h54v155H0m0,25h54v92H0M115,0h160v155H115m0,25h160v92H115"/>
        </clipPath>
        <circle clipPath="url(#c)" cx="137" cy="137" r="130"/>
    </svg>
  )
}

export default App;
