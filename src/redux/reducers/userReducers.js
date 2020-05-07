import * as types from "../constants";

import { setUser, getUser, removeUser } from "../../services/user";

const initialState = {};

function userReducer(state = initialState, action) {
  var ret;
  var user;

  switch (action.type) {
    case types.GET_USER:
      if (state === initialState) {
        user = getUser();
        ret = {
          ...state,
          user
        };
      }

      return ret;

    case types.SET_USER:
      user = action.payload;

      ret = {
        ...state,
        user
      };

      setUser(user);

      return ret;
    case types.REMOVE_USER:
      removeUser();
      return initialState;

    default:
      return state;
  }
}

export default userReducer;
