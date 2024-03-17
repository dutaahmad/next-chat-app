"use client";
import { Fragment } from "react";

import { type Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { JsonView, defaultStyles } from "react-json-view-lite";

import "react-json-view-lite/dist/index.css";

const AvatarGetter = ({ session }: { session: Session | null }) => {
    if (session) {
        if (session.user.image && session.user.name)
            return (
                <Avatar>
                    <AvatarImage src={session.user.image} />
                    <AvatarFallback>
                        {session.user.name?.split(" ")}
                    </AvatarFallback>
                </Avatar>
            );
        else
            return (
                <Fragment>
                    <JsonView data={session} style={defaultStyles} />
                </Fragment>
            );
    } else return null;
};

export default AvatarGetter;
