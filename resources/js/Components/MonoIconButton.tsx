import { ButtonType } from "@/types/props";
import clsx from "clsx";
import { IconType } from "react-icons";

export type MonoIconButtonProps = {
	type: ButtonType;
	Icon: IconType;
    disabled?: boolean;
    className?: string;
}

const MonoIconButton: React.FC<MonoIconButtonProps> = ({ type, Icon, disabled, className }) => {
	return (
		<button
            type={type}
            disabled={disabled}
            className={clsx(
                className,
                "text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition p-2 rounded-lg"
            )}
        >
            <Icon className="w-6 h-6" />
        </button>
	);
}

export default MonoIconButton;
