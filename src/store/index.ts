import store from "./store";

export type { RootState, StoreDispatch } from "./store";

export { login, statusLoaded, logout } from "./authSlice";

export { addAllPosts, addNewPost, updatePost, deletePost } from "./postsSlice";

export default store;
