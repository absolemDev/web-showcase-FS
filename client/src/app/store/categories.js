import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";

const initialState = {
  entities: [],
  isLoading: true,
  dataLoaded: false,
  error: null
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = true;
    },
    categoriesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    categoriesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.dataLoaded = false;
    },
    categoryCreateSaccess: (state, action) => {
      state.entities.push(action.payload);
    },
    categoryRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload.id
      );
    }
  }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceved, categoriesRequestFiled } =
  actions;

export const loadCategoriesList = () => async (dispatch) => {
  dispatch(categoriesRequested());
  try {
    const data = await categoryService.fetchAll();
    dispatch(categoriesReceved(data));
  } catch (error) {
    dispatch(categoriesRequestFiled(error.message));
  }
};

export const getCategories = () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) =>
  state.categories.isLoading;
export const getCategoriesDataLoadedStatus = () => (state) =>
  state.categories.dataLoaded;
export const getCategoryByClass = (classifire) => (state) => {
  return state.categories.entities.find(
    (item) => item.classifire === classifire
  );
};
export const getCategoryNameByClass = (classifire) => (state) => {
  return state.categories.entities.find(
    (item) => item.classifire === classifire
  ).name;
};

export default categoriesReducer;
