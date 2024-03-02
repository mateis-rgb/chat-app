export type RelationStatus = "pending" | "accepted" | "denied" | "blocked";
export type UserStatus = "online" | "offline" | "isWriting";

export type NotificationType = "friend_request" | "unread_message";

export type Auth = { user: User };

export type SocialMedia = {
    id: number;
    user: User;
    name: string;
    identifier: string;
    created_at: string;
    updated_at: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    status: UserStatus;
    cgu: boolean;
    share_profiles: boolean | null
}

export type Relation = {
    id: number;
    sender: User;
    recipient: User;
    status: RelationStatus;
    created_at: string;
    read_at: string;
}

export type SearchResult = {
    user: User;
    relation: Relation | null;
}

export type Notification = {
    id: number;
    from: User;
    to: User;
    type: NotificationType;
    content: string;
    created_at: string;
    updated_at: string | null;
}

export type Message = {
    id: number;
    sender: User;
    recipient: User;
    content: string;
    created_at: string;
    updated_at: string | null;
}
