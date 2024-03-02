import clsx from "clsx";
import { ConversationPageProps } from "@/types/props";
import { FormEventHandler, useEffect, useState } from "react";
import { Message, UserStatus } from "@/types";

import MonoIconButton from "@/Components/MonoIconButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import InitialsAvatar from "react-initials-avatar";
import TypingComponent from "@/Components/TypingComponent";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaArrowLeft } from "react-icons/fa6";

import "react-initials-avatar/lib/ReactInitialsAvatar.css";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import moment from "moment";


const Conversation = ({ auth, user, messages }: ConversationPageProps) => {
    const [status, setStatus] = useState<UserStatus>(user.status);

    const { data, setData, post, processing, errors, reset } = useForm({
        messageInput: "",
    });

    useEffect(() => {
        return () => {
            reset("messageInput");
        }
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("conversation.send", user.id));

        reset("messageInput");
    }

    return (
        <Authenticated
            auth={auth}
            header={
                <div className="flex flex-auto items-center gap-4">
                    <div className="shrink-0 flex items-center">
                        <Link href={route("dashboard")}>
                            <MonoIconButton
                                type="button"
                                Icon={FaArrowLeft}
                            />
                        </Link>
                    </div>

                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Conversation
                    </h2>
                </div>
            }
        >
            <Head title="Conversation" />

            <div className="py-12 px-10 w-full">
                <div className="flex flex-row gap-2">
                    <div className="w-[60rem] flex flex-col gap-2">
                        <div className="bg-white shadow-md rounded-md h-auto w-full">
                            <div className="flex flex-col items-center py-6">
                                <div className="pb-4 relative">
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

                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    { user.name }
                                </h5>

                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    { user.email }
                                </span>
                            </div>
                        </div>

                        <div className="bg-white mt-auto shadow-md rounded-md h-auto w-full px-6 py-4">
                            <form onSubmit={submit}>
                                <InputLabel htmlFor="content" value="Votre message..." />

                                <TextInput
                                    id="content"
                                    type="text"
                                    name="content"
                                    value={data.messageInput}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('messageInput', e.target.value)}
                                />

                                <InputError message={errors.messageInput} className="mt-2" />
                            </form>
                        </div>
                    </div>

                    <div
                        className={clsx(
                            "bg-white shadow-md rounded-md h-auto w-full flex flex-col p-2 justify-center",
                            messages.length === 0 ? "items-center" : "items-start"
                        )}
                    >
                        { messages.length === 0 ? (
                            <div>
                                C'est calme... trop calme...
                            </div>
                        ) : messages.map((message: Message) => (
                            <div key={message.id} className={ message.sender.id === auth.user.id ? "ml-auto" : "mr-auto" }>
                                <div
                                    className={clsx(
                                        "flex flex-col w-full max-w-[320px] leading-1.5 p-4",
                                        message.sender.id === auth.user.id ?
                                            "border-gray-200 bg-gray-100 rounded-l-xl rounded-br-xl dark:bg-gray-700" :
                                            "border-blue-200 bg-blue-100 rounded-e-xl rounded-es-xl dark:bg-blue-700"
                                    )}
                                >
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                            { message.sender.id === auth.user.id ? "Moi" : message.recipient.name }
                                        </span>
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            { moment(message.created_at).fromNow() }
                                        </span>
                                    </div>

                                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                                        { message.content }
                                    </p>

                                    <span className="text-sm font-normal ml-auto text-blue-500 dark:text-gray-400">
                                        { message.updated_at === null ? "Delivered" : moment(message.updated_at).fromNow() }
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Conversation;
