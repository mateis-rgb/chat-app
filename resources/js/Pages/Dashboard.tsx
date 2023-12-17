import { useState } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types/props';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const Dashboard = ({ auth }: PageProps) => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [errors, setErrors] = useState("");

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchInput(e.target.value);

        if (e.target.value.length !== 0) {
            const request = await fetch(`/search/profile/${e.target.value}`);

            const response = await request.json();

            setSearchResult(response);
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="flex flex-row">
                    <div className="flex-1 max-w-full mx-auto h-36 sm:px-6 lg:px-8">
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
                                    { JSON.stringify(searchResult) }
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="flex-auto max-w-full mx-auto h-36 sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
