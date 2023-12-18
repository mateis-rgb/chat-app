import { useState } from "react";
import { Relation, SearchResult, User } from "@/types";
import { SearchComponentProps } from "@/types/props";

import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import UserBox from "./UserBox";

const SearchComponent: React.FC<SearchComponentProps> = ({ auth }) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
    const [errors, setErrors] = useState("");

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchInput(e.target.value);

        if (e.target.value.length !== 0) {
            const request = await fetch(`/search/profile`);

            const response = await request.json();

            const usersList = response[0];
            const relationsList = response[1];

            const result: SearchResult[] = [];

            usersList.forEach((user: User) => {
                if (user.name.toLowerCase().includes(e.target.value)) {
                    if (relationsList.length !== 0) {
                        relationsList.forEach((relation: Relation) => {
                            if ((user.id === relation.recipient_id && auth.user.id === relation.sender_id) || (user.id === relation.sender_id && auth.user.id === relation.recipient_id)) {
                                result.push({
                                    user: user,
                                    relation: relation
                                });
                            }
                        });
                    }
                    else {
                        result.push({
                            user: user,
                            relation: null
                        });
                    }
                }
            });

            setSearchResult(result);
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div>
                    <InputLabel htmlFor="search" value="Search friend" />

                    <TextInput
                        id="search"
                        type="search"
                        name="search"
                        value={searchInput}
                        className="mt-1 block w-full"
                        autoComplete="current-search"
                        onChange={(e) => handleChange(e)}
                    />

                    <InputError message={errors} className="mt-2" />
                </div>

                <div className="mt-4 border-t-gray-200 rounded-full border-t-2"></div>

                <div className="mt-4 px-1">
                    { searchResult.map((result: SearchResult) => (
                        <UserBox key={result.user.id} user={result.user} relation={result.relation} />
                    )) }
                </div>
            </div>


        </div>
    );
}

export default SearchComponent;
