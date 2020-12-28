import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/about">
            <p>About</p>
          </Route>
          <Route path="/users">
            <p>users</p>
          </Route>
          <Route path="/">
            <p>Home</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
