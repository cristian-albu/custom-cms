import { InputHTMLAttributes } from "react";
import { Radiobox } from "./Radiobox";

export type T_Radiobox = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default Radiobox;
