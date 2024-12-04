"use client"
import { authService } from "@/appwrite";
import { logout } from "@/store/authSlice";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { ProgressDialog } from "./elements";
import { useRouter } from "next/navigation";
import pathNames from "@/pathNames";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const progressDialog = useRef<HTMLDialogElement>(null);

  const handleLogout = async () => {
    progressDialog.current?.showModal();
    const result = await authService.logout();
    if (result) {
      dispatch(logout());
      router.push(pathNames.homePath);
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      >
        Logout
      </button>
      <ProgressDialog ref={progressDialog} message="Logging out..." />
    </>
  );
};

export default LogoutButton;
