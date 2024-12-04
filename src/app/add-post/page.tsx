"use client";
import React from "react";
import { AuthLayout, PostForm } from "@/components";

const AddPostPage: React.FC = () => {
  return (
    <AuthLayout authentication>
      <PostForm />
    </AuthLayout>
  );
};

export default AddPostPage;
