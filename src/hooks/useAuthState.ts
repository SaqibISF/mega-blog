"use client"
import { useCallback, useEffect, useState } from "react";
import { statusLoaded, login, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "@/appwrite";

export const useIsStatusLoadedOnce = () => {
  return useSelector((state: RootState) => state.auth.isStatusLoadedOnce);
};

export const useUserData = () => {
  return useSelector((state: RootState) => state.auth.userData);
};

export const useAuthStatus = () => {
  return useSelector((state: RootState) => state.auth.status);
};

export const useSyncAuthStatus = () => {
  // This function sync only once when app is reload
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const [isAuthStatusLoading, setIsLoading] = useState<boolean>(true);
  const isStatusLoadedOnce = useSelector(
    (state: RootState) => state.auth.isStatusLoadedOnce
  );

  const dispatch = useDispatch();
  const fetchUserData = useCallback(async (): Promise<void> => {
    try {
      if (!isStatusLoadedOnce) {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (cookieFallback !== null && cookieFallback !== "[]") {
          const userData = await authService.getCurrentUser();
          if (userData) dispatch(login(userData));
        }
      }
    } catch (error) {
      console.log("useAuthState: ", error);
    } finally {
      setIsLoading(false);
      dispatch(statusLoaded())
    }
  }, [dispatch, isStatusLoadedOnce]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { authStatus, isAuthStatusLoading };
};
