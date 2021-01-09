import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  link: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  titleLink: {
    flexGrow: 1,
    textDecoration: "none",
  },
}));

function Navbar({ isLoggedIn }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <nv></nv>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Link to="/" className={classes.titleLink}>
            <Typography variant="h6" className={classes.title}>
              Pets Network
            </Typography>
          </Link>
          <Link
            className={classes.link}
            to="/"
            component={Button}
            color="inherit"
          >
            Home
          </Link>
          <Link
            className={classes.link}
            to="/events"
            component={Button}
            color="inherit"
          >
            Events
          </Link>
          {isLoggedIn ? (
            <div>
              <Link
                className={classes.link}
                to="/adoption-pets"
                component={Button}
                color="inherit"
              >
                Adoption Pets
              </Link>
              <Link
                className={classes.link}
                to="/profile"
                component={Button}
                color="inherit"
              >
                Profile
              </Link>
              <Link
                className={classes.link}
                to="/logout"
                component={Button}
                color="inherit"
              >
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <Link
                className={classes.link}
                to="/login"
                component={Button}
                color="inherit"
              >
                Login
              </Link>
              <Link
                className={classes.link}
                to="/signup"
                component={Button}
                color="inherit"
              >
                Signup
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });

export default connect(mapStateToProps)(Navbar);
