import { ReactNode } from "react";
import Modal from "./Modal";
import { T_Button } from "../button";

export type T_Modal = {
    title?: string;
    target: T_Button;
    children: ReactNode;
    outsideToggleClose?: boolean;
};

export default Modal;
