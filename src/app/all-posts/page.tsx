"use client";
import React from "react";
import { AuthLayout, CardsContainer } from "@/components";

const AllPostsPage: React.FC = () => {
  return (
    <AuthLayout authentication>
      <CardsContainer />
    </AuthLayout>
  );
};

export default AllPostsPage;
