import { createPortal } from "react-dom";
import { T_Modal } from ".";
import Button from "../button";
import { useEffect, useState } from "react";

const Modal = ({ title, target, children, outsideToggleClose }: T_Modal) => {
    const { children: targetChildren, ...targetProps } = target;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        closeModal();
    }, [outsideToggleClose]);
    return (
        <>
            <Button onClick={toggleModal} {...targetProps}>
                {targetChildren}
            </Button>
            {isModalOpen &&
                createPortal(
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                        <div
                            className="absolute w-full h-full bg-[#00000019]"
                            onClick={closeModal}
                        />
                        <div className="relative bg-white w-full max-w-[700px] max-h-[90%] shadow-2xl rounded-lg overflow-auto flex flex-col">
                            <div className="w-full flex p-5 border-b-2 border-b-gray-200 justify-end items-center">
                                {title && (
                                    <p className="text-xl mr-auto">{title}</p>
                                )}
                                <Button onClick={closeModal}>❌</Button>
                            </div>

                            <div className="flex flex-col p-5 w-full">
                                {children}
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default Modal;
