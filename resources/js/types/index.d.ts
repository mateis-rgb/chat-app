export type RelationStatus = "pending" | "accepted" | "denied" | "blocked";
export type UserStatus = "online" | "offline" | "isWriting";

export type NotificationType = "friend_request" | "unread_message";

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

export interface Notifications {
    id: number;
    type: NotificationType;
    content: string | null;
}
