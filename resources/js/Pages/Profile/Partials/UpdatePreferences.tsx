import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { UpdatePreferencesProps } from '@/types/props';
import { Transition } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const UpdatePreferences: React.FC<UpdatePreferencesProps> = ({ auth, className, mustVerifyEmail, status }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        share_profiles: auth.user.share_profiles === null ? false : auth.user.share_profiles
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('profile.updatePref'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account preferences.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="share_profiles"
                            checked={data.share_profiles === null ? false : data.share_profiles}
                            onChange={(e) => setData('share_profiles', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">J'accepte que mes comptes externes à l'applications soit partagé avec les autres utilisateurs.</span>

                        <InputError className="mt-2" message={errors.share_profiles} />
                    </label>
                </div>

                {mustVerifyEmail && auth.user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

export default UpdatePreferences;
