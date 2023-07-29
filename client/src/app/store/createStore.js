import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import showcasesReducer from "./showcases";
import productsdReducer from "./products";
import classifireProductsReducer from "./classifireProducts";
import categoriesReducer from "./categories";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
  users: userReducer,
  showcases: showcasesReducer,
  products: productsdReducer,
  classifireProducts: classifireProductsReducer,
  categories: categoriesReducer,
  comments: commentsReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
