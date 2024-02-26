import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types/props';
import SearchComponent from '@/Components/Search/SearchComponent';

const Dashboard = ({ auth }: PageProps) => {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="flex flex-row">
                    <div className="flex-1 max-w-full mx-auto h-36 sm:px-6 lg:px-8">
                        <SearchComponent auth={auth} />
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
