import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { generateServerError } from "../utils/generateServerError";

const initialState = localStorageService.getAccessToken()
  ? {
      auth: {
        userId: localStorageService.getUserId()
      },
      entities: [],
      isLoggedIn: true,
      isLoading: true,
      dataLoaded: false,
      error: null
    }
  : {
      auth: null,
      entities: [],
      isLoggedIn: false,
      isLoading: false,
      dataLoaded: true,
      error: null
    };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    authRequested: (state) => {
      state.isLoading = true;
    },
    signUpSuccess: (state, action) => {
      state.auth = { userId: action.payload._id };
      state.entities.push(action.payload);
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logInSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    usersListRequesed: (state) => {
      state.isLoading = true;
    },
    usersListRequestSuccess: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersListRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userUpdareRequesed: (state) => {
      state.isLoading = true;
    },
    userUpdateSuccess: (state, action) => {
      const index = state.entities.findIndex(
        (item) => item._id === state.auth.userId
      );
      state.entities[index] = action.payload;
      state.isLoading = false;
    },
    userUpdateFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userLoggedOut: (state) => {
      state.auth = null;
      state.isLoggedIn = false;
    },
    authErrorFixed: (state) => {
      state.error = null;
    }
  }
});

const { reducer: userReducer, actions } = userSlice;

const {
  authRequested,
  signUpSuccess,
  logInSuccess,
  authRequestFailed,
  usersListRequesed,
  usersListRequestSuccess,
  usersListRequestFailed,
  userUpdareRequesed,
  userUpdateSuccess,
  userUpdateFailed,
  userLoggedOut
} = actions;

export const logIn = (payload, redirect) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.login(payload);
    localStorageService.setTokens(data);
    dispatch(logInSuccess({ userId: data.userId }));
    redirect();
  } catch (error) {
    const errorMessage = error.response
      ? generateServerError(error.response.data.error.message)
      : generateServerError(error.message);
    dispatch(authRequestFailed(errorMessage));
  }
};

export const signUp = (payload, redirect) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const { authData, userData } = await authService.register(payload);
    localStorageService.setTokens(authData);
    dispatch(signUpSuccess(userData));
    redirect();
  } catch (error) {
    const errorMessage = error.response
      ? generateServerError(error.response.data.error.message)
      : generateServerError(error.message);
    dispatch(authRequestFailed(errorMessage));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
};

export const updateUserData = (payload) => async (dispatch) => {
  dispatch(userUpdareRequesed());
  try {
    const data = await userService.update(payload);
    dispatch(userUpdateSuccess(data));
  } catch (error) {
    dispatch(userUpdateFailed(error.messag));
  }
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersListRequesed());
  try {
    const data = await userService.fetchAll();
    dispatch(usersListRequestSuccess(data));
  } catch (error) {
    dispatch(usersListRequestFailed(error));
  }
};

export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUsersListLoadedStatus = () => (state) => state.users.dataLoaded;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getServerError = () => (state) => state.users.error;
export const getUserId = () => (state) => state.users.auth?.userId;
export const getUserById = (id) => (state) =>
  state.users.entities.find((item) => item._id === id);
export const getCurrentUser = () => (state) =>
  state.users.entities
    ? state.users.entities.find((item) => item._id === state.users.auth.userId)
    : null;

export default userReducer;
