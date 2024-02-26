import moment from "moment";
import { NotificationsUserBoxProps } from "@/types/props";

import InitialsAvatar from "react-initials-avatar";
import { LuMessagesSquare, LuUsers2 } from "react-icons/lu";

import "react-initials-avatar/lib/ReactInitialsAvatar.css";

const NotificationsUserBox: React.FC<NotificationsUserBoxProps> = ({ notification }) => {
    return (
        <div id="toast-notification" className="w-full p-4 text-gray-900 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-300" role="alert">
            <div className="flex items-center mb-3">
                <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">New notification</span>
            </div>

            <div className="flex items-center">
                <div className="relative inline-block shrink-0">
                    <InitialsAvatar name={"John Doe"} />

                    <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full border-white border-2">
                        { notification.type === "unread_message" ? (
                            <LuMessagesSquare className="text-white" />
                        ) : (
                            <LuUsers2 className="text-white" />
                        ) }
                    </span>
                </div>

                <div className="ms-3 text-sm font-normal flex flex-col items-start justify-center">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        { notification.from.name }
                    </div>

                    <div className="text-sm font-normal">
                        { notification.content }
                    </div>

                    <span className="text-xs font-medium ml-auto text-blue-600 dark:text-blue-500">
                        { moment(notification.created_at).fromNow() }
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NotificationsUserBox;
