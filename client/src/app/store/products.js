import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const initialState = {
  entities: [],
  isLoading: true,
  dataLoaded: false,
  error: null
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
    },
    productsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    productsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.dataLoaded = false;
    },
    productCreateRequested: (state) => {
      state.isLoading = true;
    },
    productCreateSaccess: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    productUpdateRequested: (state) => {
      state.isLoading = true;
    },
    productUpdateSaccess: (state, action) => {
      const index = state.entities.findIndex(
        (item) => item._id === action.payload._id
      );
      state.entities[index] = action.payload;
      state.isLoading = false;
    },
    productUpdateFiled: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    productRemoveRequested: (state) => {
      state.isLoading = true;
    },
    productRemoveSaccess: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload
      );
      state.isLoading = false;
    },
    productRemoveFiled: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    showcaseProductsDeleted: (state, actions) => {
      state.entities = state.entities.filter(
        (item) => item.showcase !== actions.payload.id
      );
    }
  }
});

const { reducer: productsdReducer, actions } = productsSlice;
const {
  productsRequested,
  productsReceved,
  productsRequestFiled,
  productCreateRequested,
  productCreateSaccess,
  productUpdateRequested,
  productUpdateSaccess,
  productUpdateFiled,
  productRemoveRequested,
  productRemoveSaccess,
  productRemoveFiled
} = actions;

export const loadProductsList = () => async (dispatch) => {
  dispatch(productsRequested());
  try {
    const data = await productService.fetchAll();
    dispatch(productsReceved(data));
  } catch (error) {
    dispatch(productsRequestFiled(error.message));
  }
};

export const createProduct = (payload, idSowcase) => async (dispatch) => {
  dispatch(productCreateRequested());
  try {
    const { product, showcase, category } = await productService.create(
      payload,
      idSowcase
    );
    dispatch(productCreateSaccess(product));
    if (category) {
      dispatch({
        type: "categories/categoryCreateSaccess",
        payload: category
      });
    }
    if (showcase) {
      dispatch({
        type: "showcases/updateShowcaseSaccess",
        payload: showcase
      });
    }
  } catch (error) {
    dispatch(productsRequestFiled(error.message));
  }
};

export const updateProductData =
  (payload, idShowcase, idProduct) => async (dispatch) => {
    dispatch(productUpdateRequested());
    try {
      const { product, showcase, categoryNew, categoryRemoved } =
        await productService.update(payload, idShowcase, idProduct);
      dispatch(productUpdateSaccess(product));
      if (showcase) {
        dispatch({
          type: "showcases/updateShowcaseSaccess",
          payload: showcase
        });
      }
      if (categoryNew) {
        dispatch({
          type: "categories/categoryCreateSaccess",
          payload: categoryNew
        });
      }
      if (categoryRemoved) {
        dispatch({
          type: "categories/categoryRemoved",
          payload: { id: categoryRemoved }
        });
      }
    } catch (error) {
      dispatch(productUpdateFiled(error.message));
    }
  };

export const removeProduct = (idShowcase, idProduct) => async (dispatch) => {
  console.log(idProduct);
  dispatch(productRemoveRequested());
  try {
    const { categoryRemove, showcase } = await productService.remove(
      idShowcase,
      idProduct
    );
    dispatch(productRemoveSaccess(idProduct));
    if (categoryRemove) {
      dispatch({
        type: "categories/categoryRemoved",
        payload: { id: categoryRemove }
      });
    }
    if (showcase) {
      dispatch({
        type: "showcases/updateShowcaseSaccess",
        payload: showcase
      });
    }
  } catch (error) {
    dispatch(productRemoveFiled(error.message));
  }
};

export const getProducts = () => (state) => state.products.entities;
export const getProductById = (id) => (state) =>
  state.products.entities.find((item) => item._id === id);
export const getShowcaseProducts = (idShowcase) => (state) =>
  state.products.entities.filter((item) => item.showcase === idShowcase);
export const getProductsDataLoadedStatus = () => (state) =>
  state.products.dataLoaded;
export const getProductsLoadingStatus = () => (state) =>
  state.products.isLoading;
export const getShowcaseByProduct = (productId) => (state) => {
  const showcaseId = state.products.entities.find(
    (item) => item._id === productId
  ).showcase;
  return state.showcases.entities.find((item) => item._id === showcaseId);
};
export const getProductExist = (id) => (state) => {
  return !!state.products.entities.find((item) => item._id === id);
};

export default productsdReducer;
