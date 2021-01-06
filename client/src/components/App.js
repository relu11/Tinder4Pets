import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { initAuth } from "../helpers/auth";
import PrivateRoute from "./Auth/PrivateRoute";
import Navbar from "./Navbar";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Logout from "./Auth/Logout";
import Profile from "./Profile/Profile";
import Events from "./Events/Events";

function App({ isLoggedIn, currentUser }) {
  useEffect(() => {
    console.log(currentUser);
    if (isLoggedIn === null) {
      initAuth();
    }
  });
  if (isLoggedIn === null) {
    return "Loading....";
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/events">
            <Events />
          </Route>
          <PrivateRoute exact path="/profile">
            <Profile />
          </PrivateRoute>
          <Route path="/about">
            <p>About</p>
          </Route>
          <PrivateRoute path="/users">
            <p>Users</p>
          </PrivateRoute>
          <Route path="/">
            <p>Home</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(App);
