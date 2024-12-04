"use client";
import React from "react";
import { AuthLayout, Login } from "@/components";

const LoginPage: React.FC = () => {
  return (
    <AuthLayout authentication={false}>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
