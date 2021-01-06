import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, isLoggedIn }) {
  return (
    <Route
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
