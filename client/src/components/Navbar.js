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
    flexGrow: 1,
  },
}));

function Navbar({ isLoggedIn }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pets Social Network
          </Typography>
          <Link to="/" component={Button} color="inherit">
            Home
          </Link>
          <Link to="/about" component={Button} color="inherit">
            About
          </Link>
          {isLoggedIn ? (
            <div>
              <Link to="/users" component={Button} color="inherit">
                Users
              </Link>
              <Link to="/logout" component={Button} color="inherit">
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/login" component={Button} color="inherit">
                Login
              </Link>
              <Link to="/signup" component={Button} color="inherit">
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
