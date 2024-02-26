import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ConversationPageProps } from "@/types/props";

const Conversation = ({ auth, user, messages }: ConversationPageProps) => {
    console.log(auth, user, messages);


    return (
        // <Authenticated
        //     auth={auth}
        //     header
        // >
        //     toto
        // </Authenticated>

        <div>
            toto
        </div>
    );
}

export default Conversation;
