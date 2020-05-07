import * as types from "../constants";

export const login = ({ token } = {}) => ({
  type: types.LOGIN,
  payload: { token }
});

export const logout = () => ({
  type: types.LOGOUT
});

export const isAuthenticated = () => ({
  type: types.IS_AUTHENTICATED
});
