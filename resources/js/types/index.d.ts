export type RelationStatus = "pending" | "accepted" | "denied" | "blocked";
export type UserStatus = "online" | "offline" | "isWriting";

export type NotificationType = "friend_request" | "unread_message";

export type SelectOption = { value: string, label: string };

export type Auth = { user: User };

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    status: UserStatus;
}

export interface Relation {
    id: number;
    sender: User;
    recipient: User;
    status: RelationStatus;
    created_at: string;
    read_at: string;
}

export interface SearchResult {
    user: User;
    relation: Relation | null;
}

export interface Notification {
    id: number;
    from: User;
    to: User;
    type: NotificationType;
    content: string;
    created_at: string;
    updated_at: string | null;
}

export interface Message {
    id: number;
    sender: User;
    recipient: User;
    content: string;
    created_at: string;
    updated_at: string | null;
}
