import API from "./axios";

export const signup = (data) => API.post("/auth/signup", data);

export const login = async (data) => {
  const res = await API.post("/auth/login", data);

  // persist login
  localStorage.setItem("token", res.data.token);

  return res;
};

export const getProtected = () => API.get("/protected");
