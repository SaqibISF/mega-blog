const pathNames = {
  homePath: "/",
  loginPath: "/login",
  signupPath: "/signup",
  allPostsPath: "/all-posts",
  addPostPath: "/add-post",
  editPostPath: (slug: string) => `/edit-post/${slug}`,
  postPath: (slug: string) => `/post/${slug}`,
};

export default pathNames;
