export type RelationStatus = "pending" | "accepted" | "denied" | "blocked";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    status: string;
}

export interface Relation {
    id: number;
    sender_id: number;
    recipient_id: number;
    status: RelationStatus;
    created_at: string;
}

export interface SearchResult {
    user: User;
    relation: Relation | null;
}
