"use client";

import { Fragment } from "react";
import { type Session } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { JsonView, allExpanded, darkStyles, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { useTheme } from "next-themes";

export const Hello = ({ session }: { session: Session | null }) => {
    const { theme } = useTheme()
    if (session) {
        if (session.user.image && session.user.name)
            return (
                <div className="flex gap-8 items-center">
                    <h1>Hello, {session.user.name}</h1>
                    <Avatar>
                        <AvatarImage src={session.user.image} />
                        <AvatarFallback>{session.user.name?.split(" ")}</AvatarFallback>
                    </Avatar>
                </div>
            );
        else
            return (
                <Fragment>
                    <JsonView
                        data={session}
                        shouldExpandNode={allExpanded}
                        style={theme === "dark" ? darkStyles : defaultStyles}
                    />
                </Fragment>
            );
    } else return <h1>Hello, Guest</h1>;
};
