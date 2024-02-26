import clsx from "clsx";
import { SelectProps } from "@/types/props";

import Select from "react-tailwindcss-select";

const SelectComponent: React.FC<SelectProps> = ({ options, placeholder, value, onChange }) => {
    return (
        <Select
            onChange={onChange}
            options={options}
            value={value}
        />
    );
}

export default SelectComponent;
