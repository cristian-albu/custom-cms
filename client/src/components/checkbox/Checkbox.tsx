import { FC } from "react";
import { T_Checkbox } from ".";

export const Checkbox: FC<T_Checkbox> = ({ label, ...htmlAttributes }) => {
    return (
        <label className="flex gap-2">
            <input type="checkbox" {...htmlAttributes} />
            <p>{label}</p>
        </label>
    );
};
