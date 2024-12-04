"use client";
import React from "react";
import { AuthLayout, Signup } from "@/components";

const SignupPage: React.FC = () => {
  return (
    <AuthLayout authentication={false}>
      <Signup />
    </AuthLayout>
  );
};

export default SignupPage;
