"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import pathNames from "@/pathNames";
import { useIsStatusLoadedOnce, useSyncAuthStatus } from "@/hooks";
import Loading from "./elements/Loading";
import HeroContainer from "./HeroContainer";

const Protected: React.FC<{
  children: React.ReactNode;
  authentication: boolean;
}> = ({ children, authentication }) => {
  const router = useRouter();

  const isStatusLoadedOnce = useIsStatusLoadedOnce();

  const { authStatus, isAuthStatusLoading } = useSyncAuthStatus();

  useEffect(() => {
    if (!isAuthStatusLoading) {
      if (authentication && authStatus !== authentication) {
        // The Provided Components not load when user logged out i.e. pages have operational logics (add, delete, update) etc
        // true && false !== true // Always Run this Logic
        // true && true !== true
        // false && false !== false
        // false && true !== false
        router.push(pathNames.loginPath);
      } else if (!authentication && authStatus !== authentication) {
        // The Provided Components not load when user logged in i.e. login-page or signup-page etc
        // !true && false !== true
        // !true && true !== true
        // !false && false !== false
        // !false && true !== false // Always Run this Logic
        router.push(pathNames.homePath);
      }
    }
  }, [authStatus, router, authentication, isAuthStatusLoading]);

  if (isStatusLoadedOnce) {
    return <>{children}</>;
  } else if (isAuthStatusLoading) {
    return (
      <HeroContainer>
        <Loading />
      </HeroContainer>
    );
  }
  return <>{children}</>;
};

export default Protected;
