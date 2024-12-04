import React from "react";
import { PostCard, PostCardSkeleton } from "./index";
import { usePosts } from "@/hooks";

const CardsContainer: React.FC = () => {
  const { posts, isPostsLoading } = usePosts();

  const skeletons = ["skeleton_1", "skeleton_2", "skeleton_3", "skeleton_4"];

  return (
    <div className="flex justify-center items-start bg-base-200 w-full min-h-screen bg-cover bg-center lg:pt-[4.5rem]">
      <div className="flex flex-wrap max-w-7xl w-full gap-8 justify-start p-4">
        {isPostsLoading
          ? skeletons.map((skeleton) => <PostCardSkeleton key={skeleton} />)
          : posts.map((post) => <PostCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
};

export default CardsContainer;
