import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";

function Logout({ logoutAction, isLoggedIn }) {
  useEffect(() => {
    logoutAction();
  });
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  return <div>Loading....</div>;
}

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });

export default connect(mapStateToProps, { logoutAction: logout })(Logout);
