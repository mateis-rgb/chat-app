import { Notifications } from "@/types";
import { NotificationsComponentProps } from "@/types/props";

import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";

const NotificationsComponent: React.FC<NotificationsComponentProps> = ({ className = "" }) => {
    const [notifications, setNotifications] = useState<Notifications[]>([]);
    const [unreadNotifications, setUnreadNotifications] = useState(0);

    useEffect(() => {
        const get = async () => {
            const request = await fetch("/notifications/get");
            const response = await request.json();

            console.log(response);
        }

        get();
    }, []);

    const handleClick = () => {}

    return (
        <div className={className}>
            <Dropdown inline label={(
                <AiOutlineBell className="w-5 h-5" />
            )}>
                <Dropdown.Header>Vous avez {unreadNotifications} notifications en attente.</Dropdown.Header>

                { notifications.map((notification: Notifications) => (
                    <Dropdown.Item key={notification.id}>
                        Coucou {notification.id}
                    </Dropdown.Item>
                )) }

                <Dropdown.Divider />

                <Dropdown.Item onClick={handleClick}>Marquer les notifications comme lu</Dropdown.Item>
            </Dropdown>
        </div>
    );
}

export default NotificationsComponent;
