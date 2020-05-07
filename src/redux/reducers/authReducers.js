import * as types from "../constants";

import { login, logout, isAuthenticated, getToken } from "../../services/auth";

const initialState = {
  token: "",
  isAuthenticated: false
};

function authReducer(state = initialState, action) {
  var ret;
  var token;

  switch (action.type) {
    case types.LOGIN:
      token = action.payload;

      ret = {
        ...state,
        token,
        isAuthenticated: true
      };

      login(token);

      return ret;

    case types.LOGOUT:
      logout();

      return initialState;

    case types.IS_AUTHENTICATED:
      if (state.token === "" || state.isAuthenticated === false)
        ret = {
          ...state,
          token: getToken(),
          isAuthenticated: isAuthenticated()
        };

      return ret;

    default:
      return state;
  }
}

export default authReducer;
