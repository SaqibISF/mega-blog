export type Post = {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: "active" | "inactive";
  userId: string;
};

export type PostsState = {
  data: Post[];
  isLoadedOnce: boolean;
};
