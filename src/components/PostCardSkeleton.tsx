import React from "react";

const PostCardSkeleton: React.FC = () => {
  return (
    <div className="flex w-72 flex-col gap-3 mx-auto md:mx-0">
      <div className="skeleton h-48 w-full" />
      <div className="skeleton h-4 w-28" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-full" />
    </div>
  );
};

export default PostCardSkeleton;
