"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Article } from "@/components";

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return <Article slug={slug} />
};

export default PostPage;
