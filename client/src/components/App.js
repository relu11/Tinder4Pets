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
import PetMatches from "./PetMatches";
import Events from "./Events/Events";
import AdoptionPets from "./Adoptionpets/AdoptionPets";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#8923FC" },
    secondary: { main: "#AE24FF" },
  },
});

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
      <ThemeProvider theme={theme}>
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
            <PrivateRoute exact path="/match/:petId">
              <PetMatches />
            </PrivateRoute>
            <PrivateRoute exact path="/adoption-pets">
              <AdoptionPets />
            </PrivateRoute>
            <Route path="/">
              <p>Home</p>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(App);
