import { InputHTMLAttributes } from "react";
import TextInput from "./TextInput";

export type T_TextInput = {
    label: string;
    type?: "text" | "number";
} & InputHTMLAttributes<HTMLInputElement>;

export default TextInput;
