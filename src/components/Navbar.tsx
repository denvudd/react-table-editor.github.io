"use client";

import React from "react";
import Link from "next/link";

import { useAppDispatch } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { authSelector } from "@/lib/redux/auth/selectors";

import { Button } from "./ui/Button";
import { setIsLogged } from "@/lib/redux/auth/slice";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(authSelector);

  const handleLogOut = React.useCallback(() => {
    dispatch(setIsLogged(false));
    router.push("/login");
    router.refresh();
  }, []);

  return (
    <header className="bg-secondary text-primary py-4">
      <nav className="container flex justify-between">
        <ul className="inline-flex gap-4 items-center">
          <li className="text-xl font-semibold uppercase mr-2">
            <Link href="/table">Tech</Link>
          </li>
          <li>
            <Link href="/table">Table</Link>
          </li>
        </ul>

        {isLoggedIn ? (
          <Button onClick={handleLogOut}>Log Out</Button>
        ) : (
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
