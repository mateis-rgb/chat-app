import clsx from "clsx";
import { IconButtonProps } from "@/types/props";

const IconButton: React.FC<IconButtonProps> = ({ type, className, onClick, disabled, Icon, color }) => {
    return (
        <button
            type={type}
            className={clsx(
                "h-12 w-12 transition cursor-pointer hover:text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex justify-center items-center dark:hover:text-white",
                color ?
                    `text-${color}-700 border border-${color}-700 focus:ring-${color}-300 hover:bg-${color}-700  dark:focus:ring-${color}-800 dark:hover:bg-${color}-500 dark:border-${color}-500 dark:text-${color}-500` :
                    "text-blue-700 border border-blue-700 focus:ring-blue-300 hover:bg-blue-700  dark:focus:ring-blue-800 dark:hover:bg-blue-500 dark:border-blue-500 dark:text-blue-500",
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            <Icon className="h-6 w-6" />
        </button>
    );
}

export default IconButton;
