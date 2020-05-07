import { isAuthenticated } from "./auth";

export const USER = "@user";

export const getUser = () => {
  if (isAuthenticated()) {
    const serializedUser = localStorage.getItem(USER);
    return JSON.parse(serializedUser);
  } else {
    return {};
  }
};

export const setUser = user => {
  const serializedUser = JSON.stringify(user);
  localStorage.setItem(USER, serializedUser);
};

export const removeUser = () => {
  localStorage.removeItem(USER);
};
