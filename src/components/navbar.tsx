"use client";

import Link from "next/link";
import React from "react";
import { ModeToggle } from "~/components/mode-toggle";
import { usePathname } from "next/navigation";
import { type Session } from "next-auth";
import { Button } from "./ui/button";

const menus = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Chats",
        path: "/chats",
    },
    {
        name: "Pricing",
        path: "/pricing",
    },
    {
        name: "Contact",
        path: "/contact",
    },
];

const Menus = ({
    menus,
    currentPath,
}: {
    menus: { name: string; path: string }[];
    currentPath: string;
}) => (
    <>
        {menus.map((menu) => (
            <Link
                key={menu.name}
                className={`flex items-center text-sm font-medium ${currentPath === menu.path ? "text-black dark:text-white" : ""} transition-colors hover:text-gray-900/90 dark:text-gray-400 dark:hover:text-gray-50/90`}
                href={menu.path}
            >
                {menu.name}
            </Link>
        ))}
    </>
);

export const LoginLogoutButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    if (isLoggedIn)
        return (
            <Button asChild variant={"destructive"}>
                <Link href={"/api/auth/signout"}>Sign Out</Link>
            </Button>
        );
    else
        return (
            <Button asChild>
                <Link href={"/api/auth/signin"}>Sign In</Link>
            </Button>
        );
};

const NavigationBar = ({ session }: { session: Session | null }) => {
    const isLoggedIn = !!session;
    const path = usePathname();

    if (path === "/chats") return null;

    return (
        <div className="fixed inset-x-0 top-4 z-10 mx-auto flex w-[35%] items-center justify-end rounded-3xl border bg-white/20 bg-opacity-50 p-6 px-4 shadow-lg backdrop-blur-sm backdrop-filter dark:bg-black/20 md:px-6">
            <nav className="hidden w-full items-center justify-center gap-12 space-x-4 md:flex">
                <Menus menus={menus} currentPath={path} />
                <LoginLogoutButton isLoggedIn={isLoggedIn} />
            </nav>
            <ModeToggle />
        </div>
    );
};

export default NavigationBar;
