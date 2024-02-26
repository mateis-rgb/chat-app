import { ReactNode } from "react";
import { User, Relation, Notification, Auth, Message, SelectOption } from ".";
import { IconType } from "react-icons";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: Auth;
};

export type NewConversationPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: Auth;
    users: User[];
}

export type ConversationPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: Auth;
    user: User;
    message: Message
};

export type UserBoxProps = {
    auth: Auth
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
export type NotificationsUserBoxProps = {
    notification: Notification;
}

export type ErrorPageProps = {
    status: number;
}

export type IconButtonProps = {
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    Icon: IconType;
    color?: string;
};

export type SelectProps = {
    options: SelectOption[];
    placeholder?: string;
    value: IntrinsicAttributes & SelectProps;
    onChange: (value: SelectValue) => void;
}
