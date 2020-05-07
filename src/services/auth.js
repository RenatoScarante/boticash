export const TOKEN = "@token";

export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN) !== null;
};

export const getToken = () => localStorage.getItem(TOKEN);

export const login = user => {
  localStorage.setItem(TOKEN, user.token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN);
};
