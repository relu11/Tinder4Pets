import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useFormStyles } from "../../helpers/styles";
import { clearAuthError, signup } from "../../redux/actions/authActions";

function Signup({ isLoggedIn, error, clearError, signupAction }) {
  const classes = useFormStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    signupAction({ email, password, name, city });
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

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
            id="name"
            type="text"
            name="name"
            label="Name"
            fullWidth
            className={classes.formField}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="city"
            type="text"
            name="city"
            label="City"
            fullWidth
            className={classes.formField}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
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
  signupAction: signup,
  clearError: clearAuthError,
})(Signup);
