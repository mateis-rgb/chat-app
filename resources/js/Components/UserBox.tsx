import { UserBoxProps } from "@/types/props";
import InitialsAvatar from "react-initials-avatar";
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlineMessage } from "react-icons/ai";

import "react-initials-avatar/lib/ReactInitialsAvatar.css";
import { useState } from "react";
import clsx from "clsx";
import { UserStatus } from "@/types";
import TypingComponent from "./TypingComponent";

const UserBox: React.FC<UserBoxProps> = ({ user, relation }) => {
    const [isFollowedByUser, setIsFollowedByUser] = useState(relation?.sender_id === user.id);
    const [isAlreadyFollowedByCurrentUser, setIsAlreadyFollowedByCurrentUser] = useState(relation?.recipient_id === user.id);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<UserStatus>("offline");

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

    return (
        <div className="flex flex-row justify-between mt-4 p-6 bg-gray-50 hover:bg-gray-100 transition dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex flex-row justify-start relative me-4">
                <div className="mr-4">
                    <InitialsAvatar name={user.name} />
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

            <div>
                { isAlreadyFollowedByCurrentUser && (

                    <button
                        type="button"
                        className={clsx(
                            "h-12 w-12 mr-4 transition hover:text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex justify-center items-center dark:hover:text-white",
                            "text-blue-700 border border-blue-700 focus:ring-blue-300 hover:bg-blue-700  dark:focus:ring-blue-800 dark:hover:bg-blue-500 dark:border-blue-500 dark:text-blue-500"
                        )}
                        disabled={isLoading}
                    >
                        <AiOutlineMessage className="h-6 w-6" />
                    </button>
                ) }

                <button
                    type="button"
                    className={clsx(
                        "h-12 w-12 transition hover:text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex justify-center items-center dark:hover:text-white",
                        isAlreadyFollowedByCurrentUser ?
                            "text-red-700 border border-red-700 focus:ring-red-300 hover:bg-red-700  dark:focus:ring-red-800 dark:hover:bg-red-500 dark:border-red-500 dark:text-red-500" :
                            "text-blue-700 border border-blue-700 focus:ring-blue-300 hover:bg-blue-700  dark:focus:ring-blue-800 dark:hover:bg-blue-500 dark:border-blue-500 dark:text-blue-500"
                    )}
                    onClick={handleClick}
                    disabled={isLoading}
                >
                    { isAlreadyFollowedByCurrentUser ? (
                        <AiOutlineUserDelete className="h-6 w-6" />
                    ) : (
                        <AiOutlineUserAdd className="h-6 w-6" />
                    ) }
                </button>
            </div>
        </div>
    );
}

export default UserBox;
