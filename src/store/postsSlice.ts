import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostsState } from "@/types";

const initialState: PostsState = {
  data: [],
  isLoadedOnce: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addAllPosts(state, action: PayloadAction<Post[]>) {
      state.data = action.payload;
      state.isLoadedOnce = true
    },
    addNewPost(state, action: PayloadAction<Post>) {
      state.data.push(action.payload);
    },
    updatePost(state, action: PayloadAction<Post>) {
      const index = state.data.findIndex(
        (post) => post.slug === action.payload.slug
      );
      state.data[index] = action.payload;
    },
    deletePost(state, action: PayloadAction<string>) {
      const index = state.data.findIndex(
        (post) => post.slug === action.payload
      );
      state.data.splice(index, 1);
    },
  },
});

export const { addAllPosts, addNewPost, updatePost, deletePost } =
  postsSlice.actions;

export default postsSlice.reducer;
