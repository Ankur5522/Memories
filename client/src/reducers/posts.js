import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../actions/posts";
import { createPost, updatePost, deletePost } from "../actions/posts";
import { likePost } from "../actions/posts";
import { getPostsBySearch } from "../actions/posts";

const initialState = {
  posts: [],
  currentPage: 1,
  numberOfPages: null,
  status: "idle", // or 'loading', 'succeeded', 'failed'
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Other synchronous reducers can be defined here
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(likePost.pending, (state) => {
      state.status = "loading";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPostsBySearch.pending, (state) => {
      state.status = "loading";
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPostsBySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
