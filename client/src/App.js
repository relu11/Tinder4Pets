import React, { useState } from 'react';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);

  const handleClick = async service => {
    const res = await fetch(`http://localhost:3001/${service == 'index' ? '' : service}`);
    setLogs([await res.text(), ...logs]);
    console.log(logs)
  };

  return (
    <div className='App'>
      <div className='buttons'>
        <button onClick={e => handleClick('communication')} >communication</button>
        <button onClick={e => handleClick('events')} >events</button>
        <button onClick={e => handleClick('iam')} >communication</button>
        <button onClick={e => handleClick('index')} >index</button>
        <button onClick={e => handleClick('recommendation')} >recommendation</button>
      </div>
      <div className='logs'>
        {logs.map(log => <p>{log}</p>)}
      </div>
    </div>
  );
}

export default App;
