import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "../services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? (
    <Route {...rest} />
  ) : (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{ pathname: "/entrar", state: { from: props.location } }}
        />
      )}
    />
  );
};

export default PrivateRoute;
