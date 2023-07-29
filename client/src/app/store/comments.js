import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const initialState = {
  entities: [],
  isLoading: true,
  dataLoaded: false,
  error: null
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.dataLoaded = false;
    },
    commentCreateRequested: (state) => {
      state.isLoading = true;
    },
    addReplyRequested: (state) => {
      state.isLoading = true;
    },
    repltAddedSaccess: (state, action) => {
      const index = state.entities.findIndex(
        (item) => item._id === action.payload._id
      );
      state.entities[index] = action.payload;
      state.isLoading = false;
    },
    repltAddedFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreateSaccess: (state, action) => {
      state.entities.unshift(action.payload);
      state.isLoading = false;
    },
    commentCreateFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentRemoveRequested: (state) => {
      state.isLoading = true;
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload.id
      );
      state.isLoading = false;
    },
    commentRemoveFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceved,
  commentsRequestFiled,
  commentCreateRequested,
  commentCreateSaccess,
  commentCreateFiled,
  commentRemoveRequested,
  commentRemoved,
  commentRemoveFiled,
  addReplyRequested,
  repltAddedSaccess,
  repltAddedFiled
} = actions;

export const loadCommentsList = () => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const data = await commentService.fetchAll();
    dispatch(commentsReceved(data));
  } catch (error) {
    dispatch(commentsRequestFiled(error.message));
  }
};

export const createComment = (payload) => async (dispatch) => {
  dispatch(commentCreateRequested());
  try {
    const { comment, showcase, product } = await commentService.create(payload);
    dispatch(commentCreateSaccess(comment));
    dispatch({
      type: "showcases/updateShowcaseSaccess",
      payload: showcase
    });
    dispatch({
      type: "products/productUpdateSaccess",
      payload: product
    });
  } catch (error) {
    dispatch(commentCreateFiled(error.message));
  }
};

export const addReplyComment = (payload, id) => async (dispatch) => {
  dispatch(addReplyRequested());
  try {
    const data = await commentService.reply(payload, id);
    dispatch(repltAddedSaccess(data));
  } catch (error) {
    dispatch(repltAddedFiled(error.message));
  }
};

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentRemoveRequested());
  try {
    await commentService.remove(id);
    dispatch(commentRemoved({ id }));
  } catch (error) {
    dispatch(commentRemoveFiled(error.message));
  }
};

export const getCommentsByTarget = (target) => (state) =>
  state.comments.entities.filter((item) => item.targetId === target);
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;
export const getCommentsDataLoadedStatus = () => (state) =>
  state.comments.dataLoaded;

export default commentsReducer;
