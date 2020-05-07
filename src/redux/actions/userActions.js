import * as types from "../constants";

export const getUser = () => ({
  type: types.GET_USER
});

export const setUser = ({ user } = {}) => ({
  type: types.SET_USER,
  payload: user
});

export const removeUser = () => ({
  type: types.REMOVE_USER
});
