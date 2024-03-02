import { ProfilePageProps } from "@/types/props";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import clsx from "clsx";
import TypingComponent from "@/Components/TypingComponent";
import InitialsAvatar from "react-initials-avatar";

import "react-initials-avatar/lib/ReactInitialsAvatar.css";
import { useState } from "react";
import { Relation, UserStatus } from "@/types";
import IconButton from "@/Components/IconButton";
import { AiOutlineMessage, AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";

const Index: React.FC<ProfilePageProps> = ({ auth, user, relations }) => {
    const [isFollowedByUser, setIsFollowedByUser] = useState(false);
    const [isAlreadyFollowedByCurrentUser, setIsAlreadyFollowedByCurrentUser] = useState(true);
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

    const handleSendFriendRequest = async () => {
        setIsLoading(true);

        const request = await fetch(isAlreadyFollowedByCurrentUser ? `/friends/${user.id}/remove` : `/friends/${user.id}/send`);
        const response = await request.json();

        if (response.status === 200) {
            setIsAlreadyFollowedByCurrentUser(!isAlreadyFollowedByCurrentUser);

            return;
        }

        setIsLoading(false);
    }

    relations.map((relation: Relation) => {
        if (relation.recipient.id === auth.user.id) {
            setIsAlreadyFollowedByCurrentUser(false);
        }
        else {
            setIsAlreadyFollowedByCurrentUser(true);
        }

        if (relation.sender.id === user.id) {
            setIsFollowedByUser(true);
        }
        else {
            setIsFollowedByUser(false);
        }
    });

    return (
        <Authenticated
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Profil de {user.name}
                </h2>
            }
        >
            <Head title={`Profil de ${user.name}`} />

            <div className="py-12 px-10">
                <div className="flex flex-row gap-2 max-w-3xl mx-auto">
                    <div className="w-full flex flex-col gap-2">
                        <div className="bg-white shadow-md rounded-md h-auto w-full">
                            <div className="flex flex-row justify-start items-center gap-2 px-8 py-6">
                                <div className="relative">
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

                                <div className="flex flex-col ml-2">
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                        { user.name }
                                    </h5>

                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        { user.email }
                                    </span>
                                </div>

                                <div className="flex lg:flex-row lg:gap-2 flex-col ml-auto items-center gap-1">
                                    {!isFollowedByUser ? (
                                        <IconButton
                                            type="button"
                                            color="blue"
                                            disabled={isLoading}
                                            Icon={AiOutlineUserAdd}
                                            onClick={handleSendFriendRequest}
                                        />
                                    ) : (
                                        <>
                                            <Link href={route("conversation.index", user.id)}>
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
                        </div>

                        <div className="bg-white mt-auto shadow-md rounded-md h-auto w-full px-6 py-4">
                            { user.name } à { relations.length } ami{ relations.length > 1 ? "s" : "" }
                        </div>
                    </div>

                    { auth.user.share_profiles && (
                        <div className="bg-white shadow-md rounded-md h-auto w-full flex flex-col p-2 justify-center items-center">
                            Réseaux sociaux auxquels est connecté { auth.user.name }
                        </div>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}

export default Index;
