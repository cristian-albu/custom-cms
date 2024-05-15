import { InputHTMLAttributes } from "react";
import { Checkbox } from "./Checkbox";

export type T_Checkbox = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default Checkbox;
