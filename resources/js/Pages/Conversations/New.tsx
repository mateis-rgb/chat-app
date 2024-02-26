import { NewConversationPageProps } from "@/types/props";
import { useState } from "react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectComponent from "@/Components/SelectComponent";
import { SelectOption, User } from "@/types";

const Conversation = ({ auth, users }: NewConversationPageProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const selectOptions: SelectOption[] = [];

    users.map((user: User) => {
        const option: SelectOption = {
            value: user.id.toString(),
            label: user.name
        }

        selectOptions.push(option);
    });

    return (
        <Authenticated
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Nouvelle Conversation
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="flex flex-row">
                    <div className="flex-auto max-w-6xl mx-auto h-36 sm:px-6 lg:px-8">
                        {/* User Search Input */}
                        <div className="bg-white my-4 p-5 dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg">
                            <InputLabel htmlFor="search" value="Trouver des amis" />

                            <SelectComponent label="Amis..." options={selectOptions} />
                        </div>

                        {/* Send Message */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md my-4 sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">Send Messages</div>
                        </div>

                        {/* Messages */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md my-4 sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">Messages</div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Conversation;
