import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { SocialMedia } from "@/types";
import { UpdateSocialMediasProps } from "@/types/props";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

const UpdateSocialMedias: React.FC<UpdateSocialMediasProps> = ({ auth, social_medias, status, mustVerifyEmail, className }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        social_medias: social_medias
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // post(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {social_medias.map((social_media: SocialMedia, index: number) => (
                    <div>
                        <InputLabel htmlFor="name" value="Nom du réseau social" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.social_medias[index].name}
                            onChange={(e) => setData('social_medias', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.social_medias[index].identifier}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                ))}


                {mustVerifyEmail && user.email_verified_at === null && (
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

export default UpdateSocialMedias;
