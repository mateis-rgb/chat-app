import clsx from "clsx";
import { UserBoxProps } from "@/types/props";
import { useState } from "react";
import { UserStatus } from "@/types";

import InitialsAvatar from "react-initials-avatar";
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlineMessage, AiOutlineClose } from "react-icons/ai";
import TypingComponent from "../TypingComponent";
import IconButton from "../IconButton";
import { Link } from "@inertiajs/react";

import "react-initials-avatar/lib/ReactInitialsAvatar.css";

const UserBox: React.FC<UserBoxProps> = ({ auth, user, relation }) => {
    const [isFollowedByUser, setIsFollowedByUser] = useState(relation?.sender.id === user.id);
    const [isAlreadyFollowedByCurrentUser, setIsAlreadyFollowedByCurrentUser] = useState(relation?.recipient.id === user.id);
    const [isPending, setIsPending] = useState(relation?.status === "pending");
    const [status, setStatus] = useState<UserStatus>("offline");
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);

        const request = await fetch(isAlreadyFollowedByCurrentUser ? `/friends/${user.id}/remove` : `/friends/${user.id}/send`);
        const response = await request.json();

        if (response.status === 200) {
            setIsAlreadyFollowedByCurrentUser(!isAlreadyFollowedByCurrentUser);

            return;
        }

        setIsLoading(false);
    }

    const handleDenyFriendRequest = async () => {
        setIsLoading(true);

        const request = await fetch(`/friends/${user.id}/deny`);
        const response = await request.json();

        if (response.status === 200) {
            setIsAlreadyFollowedByCurrentUser(false);
            setIsPending(true);

            return;
        }

        setIsLoading(false);
    }

    const handleAcceptFriendRequest = async () => {
        setIsLoading(true);

        const request = await fetch(`/friends/${user.id}/accept`);
        const response = await request.json();

        if (response.status === 200) {
            setIsAlreadyFollowedByCurrentUser(true);
            setIsPending(false);

            return;
        }

        setIsLoading(false);
    }

    return (
        <div className="flex flex-row justify-between mt-4 p-6 bg-gray-50 hover:bg-gray-100 transition dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex flex-row justify-start relative me-4">
                <div className="mr-4">
                    <Link href={route("profile.index", user.id)}>
                        <InitialsAvatar name={user.name} />
                    </Link>

                    { status === "isWriting" ? (
                        <div className="absolute top-0 start-8">
                            <TypingComponent />
                        </div>
                    ) : (
                        <span
                            className={clsx(
                                "top-0 start-9 absolute w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full",
                                status === "online" ? "bg-green-500" : "bg-gray-500"
                            )}
                        ></span>
                    ) }

                </div>

                <div className="flex flex-col">
                    <div>
                        <span className="text-xl font-bold">
                            { user.name }
                        </span>

                        { isFollowedByUser && (
                            <> - <span className="text-gray-500 italic">
                                    Vous suit
                                </span>
                            </>) }
                    </div>

                    <div>
                        { user.email }
                    </div>
                </div>
            </div>

            <div className="flex lg:flex-row lg:gap-2 flex-col items-center gap-1">
                { isPending && isFollowedByUser ? (
                    <>
                        <IconButton
                            type="button"
                            color="green"
                            disabled={isLoading}
                            Icon={AiOutlineUserAdd}
                            onClick={handleAcceptFriendRequest}
                        />

                        <IconButton
                            type="button"
                            color="red"
                            disabled={isLoading}
                            Icon={AiOutlineClose}
                            onClick={handleDenyFriendRequest}
                        />
                    </>
                ) : (
                    <>
                        <Link href={route("conversation.index", user.id)} as="button">
                            <IconButton
                                type="button"
                                disabled={isLoading}
                                Icon={AiOutlineMessage}
                            />
                        </Link>

                        <IconButton
                            type="button"
                            color={isAlreadyFollowedByCurrentUser ? "red" : ""}
                            onClick={handleClick}
                            disabled={isLoading}
                            Icon={AiOutlineUserDelete}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default UserBox;
