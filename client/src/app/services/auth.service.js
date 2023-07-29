import localStorageService from "./localStorage.service";
import config from "../config.json";
import axios from "axios";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "/auth/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});

const authService = {
  register: async (payload) => {
    const { data } = await httpAuth.post("signUp", payload);
    return data;
  },
  login: async (payload) => {
    const { data } = await httpAuth.post("signInWithPassword", payload);
    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      refresh_token: localStorageService.getRefreshToken()
    });
    return data;
  }
};

export default authService;
