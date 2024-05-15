import { FC } from "react";
import { T_Radiobox } from ".";

export const Radiobox: FC<T_Radiobox> = ({ label, ...htmlAttributes }) => {
    return (
        <label className="flex gap-2">
            <input type="radio" {...htmlAttributes} />
            <p>{label}</p>
        </label>
    );
};
