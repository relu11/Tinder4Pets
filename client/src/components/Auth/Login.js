import {
  Button,
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearAuthError, login } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: "center",
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

function Login({ isLoggedIn, error, clearError, loginAction }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    loginAction({ email, password });
  };

  const renderError = () => {
    if (error) {
      return (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      );
    }
  };

  return (
    <div>
      <Container component={Paper} maxWidth="xs" className={classes.root}>
        <Typography variant="h6">Log In</Typography>
        <form onSubmit={handleSubmit}>
          {renderError()}
          <TextField
            id="email"
            type="email"
            name="email"
            label="Email"
            fullWidth
            className={classes.formField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            label="Password"
            fullWidth
            className={classes.formField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.formField}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.auth.isLoggedIn, error: state.auth.error };
};

export default connect(mapStateToProps, {
  loginAction: login,
  clearError: clearAuthError,
})(Login);
