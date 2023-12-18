import { UserBoxProps } from "@/types/props";

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
    return (
        <div>
            { user.name }
        </div>
    );
}

export default UserBox;
