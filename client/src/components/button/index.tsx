import { ButtonHTMLAttributes } from "react";
import Button from "./Button";

export type T_Button = {
    btnOutline?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default Button;
