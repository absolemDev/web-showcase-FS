import { createSlice } from "@reduxjs/toolkit";
import showcaseService from "../services/showcase.service";

const initialState = {
  entities: [],
  isLoading: true,
  dataLoaded: false,
  error: null
};

const showcasesSlice = createSlice({
  name: "showcases",
  initialState,
  reducers: {
    showcasesRequested: (state) => {
      state.isLoading = true;
    },
    updateShowcaseRequested: (state) => {
      state.isLoading = true;
    },
    createShowcaseRequested: (state) => {
      state.isLoading = true;
    },
    showcasesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    showcasesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.dataLoaded = false;
    },
    createShowcaseSaccess: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    updateShowcaseSaccess: (state, action) => {
      const index = state.entities.findIndex(
        (item) => item._id === action.payload._id
      );
      state.entities[index] = action.payload;
      state.isLoading = false;
    },
    updateShowcasFiled: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createShowcaseFiled: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeShowcaseRequested: (state) => {
      state.isLoading = true;
    },
    removeShowcaseSaccess: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload
      );
      state.isLoading = false;
    },
    removeShowcaseFiled: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

const { reducer: showcasesReducer, actions } = showcasesSlice;
const {
  showcasesRequested,
  createShowcaseRequested,
  updateShowcaseRequested,
  showcasesReceved,
  showcasesRequestFiled,
  createShowcaseSaccess,
  updateShowcaseSaccess,
  updateShowcasFiled,
  createShowcaseFiled,
  removeShowcaseRequested,
  removeShowcaseSaccess,
  removeShowcaseFiled
} = actions;

export const loadShowcasesList = () => async (dispatch, getState) => {
  dispatch(showcasesRequested());
  try {
    const data = await showcaseService.fetchAll();
    dispatch(showcasesReceved(data));
  } catch (error) {
    dispatch(showcasesRequestFiled(error.message));
  }
};

export const createShowcase = (payload, redirect) => async (dispatch) => {
  dispatch(createShowcaseRequested());
  try {
    const data = await showcaseService.create(payload);
    dispatch(createShowcaseSaccess(data));
    redirect(data._id);
  } catch (error) {
    dispatch(createShowcaseFiled(error.message));
  }
};

export const updateShowcaseData =
  (payload, id, callback) => async (dispatch) => {
    dispatch(updateShowcaseRequested());
    try {
      const data = await showcaseService.update(payload, id);
      dispatch(updateShowcaseSaccess(data));
      callback();
    } catch (error) {
      dispatch(updateShowcasFiled(error.message));
    }
  };

export const removeShowcase = (id, redirect) => async (dispatch) => {
  dispatch(removeShowcaseRequested());
  try {
    const { deletedCategories } = await showcaseService.remove(id);
    if (deletedCategories) {
      deletedCategories.forEach((item) =>
        dispatch({ type: "categories/categoryRemoved", payload: { id: item } })
      );
    }
    dispatch({ type: "products/showcaseProductsDeleted", payload: { id } });
    dispatch(removeShowcaseSaccess(id));
    redirect();
  } catch (error) {
    dispatch(removeShowcaseFiled(error.message));
  }
};

export const getShowcases = () => (state) => state.showcases.entities;
export const getShowcaseById = (id) => (state) => {
  return state.showcases.entities.find((item) => item._id === id);
};
export const getUserShowcaseById = (id) => (state) => {
  return state.showcases.entities.find(
    (item) => item._id === id && item.owner === state.users.auth.userId
  );
};
export const getShowcaseNameById = (id) => (state) => {
  return state.showcases.entities.find((item) => item._id === id).name;
};
export const getUserShowcaseAccess = (id) => (state) => {
  return state.users.auth
    ? !!state.showcases.entities.find(
        (item) => item._id === id && item.owner === state.users.auth.userId
      )
    : false;
};
export const getShowcaseExist = (id) => (state) => {
  return !!state.showcases.entities.find((item) => item._id === id);
};
export const getUserShowcases = () => (state) =>
  state.showcases.entities.filter(
    (item) => item.owner === state.users.auth.userId
  );
export const getShowcasesLoadingStatus = () => (state) =>
  state.showcases.isLoading;
export const getShowcasesDataLoadedStatus = () => (state) =>
  state.showcases.dataLoaded;

export default showcasesReducer;
