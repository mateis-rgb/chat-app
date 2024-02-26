import { Notification } from "@/types";
import { NotificationsComponentProps } from "@/types/props";

import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import NotificationsUserBox from "./NotificationUserBox";

const NotificationsComponent: React.FC<NotificationsComponentProps> = ({ className = "" }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadNotifications, setUnreadNotifications] = useState(0);

    useEffect(() => {
        (async () => {
            const request = await fetch("/notifications/get");
            const response: Notification[] = await request.json();

            response.map((notification: Notification) => {
                setUnreadNotifications(unreadNotifications + 1);
            });

            setNotifications(response);
        })();
    }, []);

    const clearNotifications = async () => {
        const request = await fetch("/notifications/clear");
        const response: boolean = await request.json();

        if (response) {
            setNotifications([]);
            setUnreadNotifications(0);
        }
    }

    return (
        <div className={className}>
            <Dropdown className="w-96" dismissOnClick={false} inline label={(
                <AiOutlineBell className="w-5 h-5" />
            )}>
                <Dropdown.Header>Vous avez {unreadNotifications} notifications en attente.</Dropdown.Header>

                { notifications.map((notification: Notification) => (
                    <Dropdown.Item className="cursor-default" key={notification.id}>
                        <NotificationsUserBox notification={notification} />
                    </Dropdown.Item>
                )) }


                { notifications.length !== 0 && (
                    <>
                        <Dropdown.Divider />

                        <Dropdown.Item onClick={clearNotifications}>Marquer les notifications comme lu</Dropdown.Item>
                    </>
                ) }
            </Dropdown>
        </div>
    );
}

export default NotificationsComponent;
