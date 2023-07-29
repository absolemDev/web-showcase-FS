import { createSlice } from "@reduxjs/toolkit";
import productClassifireService from "../services/productClassifire.service";

const initialState = {
  entities: [],
  isLoading: false,
  dataLoaded: false,
  error: null
};

const classifireProductsSlice = createSlice({
  name: "classifireProducts",
  initialState,
  reducers: {
    classifireProductsRequested: (state) => {
      state.isLoading = true;
    },
    classifireProductsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    classifireProductsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.dataLoaded = false;
    },
    classifireProductsCleared: (state) => {
      state.entities = [];
    }
  }
});

const { reducer: classifireProductsReducer, actions } = classifireProductsSlice;
const {
  classifireProductsRequested,
  classifireProductsReceved,
  classifireProductsRequestFiled
} = actions;

export const loadClassifireProducts = (name) => async (dispatch) => {
  dispatch(classifireProductsRequested());
  try {
    const data = await productClassifireService.search(name);
    dispatch(classifireProductsReceved(data));
  } catch (error) {
    dispatch(classifireProductsRequestFiled(error.message));
  }
};

export const getClassifireProducts = () => (state) =>
  state.classifireProducts.entities;
export const getClassifireProductsLoadingStatus = () => (state) =>
  state.classifireProducts.isLoading;

export default classifireProductsReducer;
