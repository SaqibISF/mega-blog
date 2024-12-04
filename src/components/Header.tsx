"use client";
import React from "react";
import { Container, Logo, ThemeSwitcher } from "./index";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import pathNames from "@/pathNames";
import { useSyncAuthStatus } from "@/hooks";
import SVGIcon, { menuIcon } from "@/icons";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const { authStatus, isAuthStatusLoading } = useSyncAuthStatus();

  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: pathNames.homePath,
      auth: true && !isAuthStatusLoading,
    },
    {
      name: "Login",
      href: pathNames.loginPath,
      auth:
        pathname !== pathNames.loginPath && !authStatus && !isAuthStatusLoading,
    },
    {
      name: "Signup",
      href: pathNames.signupPath,
      auth:
        pathname !== pathNames.signupPath && !authStatus && !isAuthStatusLoading,
    },
    {
      name: "All Posts",
      href: pathNames.allPostsPath,
      auth: authStatus && !isAuthStatusLoading,
    },
    {
      name: "Add Post",
      href: pathNames.addPostPath,
      auth: authStatus && !isAuthStatusLoading,
    },
  ];

  return (
    <header className="lg:absolute lg:top-0 lg:left-0 lg:right-0">
      <nav>
        <Container className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <SVGIcon icon={menuIcon} size="1.8em" />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navItems.map(
                  (item) =>
                    item.auth && (
                      <li key={item.href}>
                        <Link href={item.href}>{item.name}</Link>
                      </li>
                    )
                )}
                {authStatus && !isAuthStatusLoading && (
                  <li>
                    <LogoutButton />
                  </li>
                )}
              </ul>
            </div>
            <Link href={pathNames.homePath}>
              <Logo />
            </Link>
          </div>
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {navItems.map(
                (item) =>
                  item.auth && (
                    <li key={item.href}>
                      <Link href={item.href}>{item.name}</Link>
                    </li>
                  )
              )}
              {authStatus && !isAuthStatusLoading && (
                <li>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </div>

          <ThemeSwitcher className="ml-auto" />
        </Container>
      </nav>
    </header>
  );
};

export default Header;
