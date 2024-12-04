"use client"
import React from "react";

const PageNotFound404: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-6xl font-semibold text-primary mb-4">404</h1>
        <h2 className="text-xl text-base-content">
          This page could not be found.
        </h2>
      </div>
    </div>
  );
};

export default PageNotFound404;
