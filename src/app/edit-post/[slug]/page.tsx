"use client";
import React from "react";
import {
  AuthLayout,
  HeroContainer,
  Loading,
  PageNotFound404,
  PostForm,
} from "@/components";
import { useParams } from "next/navigation";
import { usePost } from "@/hooks";

const EditPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, isPostLoading } = usePost(slug);

  if (post) {
    return (
      <AuthLayout authentication>
        <PostForm post={post} />
      </AuthLayout>
    );
  } else if (!isPostLoading) {
    return <PageNotFound404 />;
  } else
    return (
      <HeroContainer>
        <Loading />
      </HeroContainer>
    );
};

export default EditPostPage;
