import { ReactNode } from "react";
import { User, Relation } from ".";

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type UserBoxProps = {
    user: User,
    relation: Relation | null
}

export type SearchComponentProps = {
    auth: {
        user: User
    }
}

export type DropdownChildProps = {
    className?: string;
    children: ReactNode;
}

export type NotificationsComponentProps = {
    className?: string;
}
