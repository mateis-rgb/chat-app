import { ReactNode } from "react";
import { User, Relation, Notification, Auth, Message, SocialMedia } from ".";
import { IconType } from "react-icons";

export type ButtonType = "button" | "submit" | "reset";

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: Auth;
};

export type NewConversationPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: Auth;
    users: User[];
}

export type ConversationPageProps = {
    auth: Auth;
    user: User;
    messages: Message[];
};

export type ProfilePageProps = {
    auth: Auth;
    user: User;
    relations: Relation[];
}

export type UpdatePreferencesProps = {
    mustVerifyEmail: boolean;
    className?: string;
    status?: string;
    auth: Auth;
}

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
    type?: ButtonType;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    Icon: IconType;
    color?: string;
};

export type UpdateSocialMediasProps = {
    auth: Auth;
    social_medias: SocialMedia[];
    status?: string;
    mustVerifyEmail: boolean;
    className?: string;
}
