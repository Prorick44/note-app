export const getToken = () => localStorage.getItem("token");

export const isLoggedIn = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth";
};
