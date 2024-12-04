"use client";
import { databaseService } from "@/appwrite";
import { addAllPosts, RootState } from "@/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const usePost = (slug: string) => {
  const dispatch = useDispatch();

  const post = useSelector((state: RootState) =>
    state.posts.data.find((post) => post.slug === slug)
  );

  const isLoadedOnce = useSelector(
    (state: RootState) => state.posts.isLoadedOnce
  );

  const [isPostLoading, setIsLoading] = useState<boolean>(true);

  const fetchPost = useCallback(async () => {
    try {
      if (!post) {
        const posts = await databaseService.getPosts();
        if (posts) dispatch(addAllPosts(posts));
      }
    } catch (error) {
      console.log(`fetchPost(slug: ${slug}) usePostsState: `, error);
    } finally {
      setIsLoading(false);
      if (!isLoadedOnce) {
        const posts = await databaseService.getPosts();
        if (posts) dispatch(addAllPosts(posts));
      }
    }
  }, [slug, post, isLoadedOnce, dispatch]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, isPostLoading };
};

export const usePosts = () => {
  const posts = useSelector((state: RootState) => state.posts.data);
  const [isPostsLoading, setIsLoading] = useState<boolean>(true);

  const isLoadedOnce = useSelector(
    (state: RootState) => state.posts.isLoadedOnce
  );

  const dispatch = useDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      if (!isLoadedOnce) {
        const posts = await databaseService.getPosts();
        if (posts) dispatch(addAllPosts(posts));
      }
    } catch (error) {
      console.log("fetchPosts usePostsState: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, isLoadedOnce]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isPostsLoading };
};
