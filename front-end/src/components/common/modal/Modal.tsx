import React from "react"
import S from './Modal.module.css';
import {ModalHeaderProps, ModalProps} from "./Modal.types";

/**
 * @function ModalHeader
 * @description The header for the modal where the title and closing button rest
 * @author J. Trpka
 * @param {props} ModalHeaderProps
 * @returns {JSX.Element}
 */
const ModalHeader = ({
    title,
    onClose
}: ModalHeaderProps) => {
    return (
        <header className={S.modal__header}>
            <h2>{title}</h2> 
            <span onClick={onClose}>X</span>
        </header>
    );
};

/**
 * @function Modal
 * @description The basic modal wrapper component
 * @author J. Trpka
 * @param {props} ModalProps
 * @returns {JSX.Element}
 */
const Modal = ({title, isOpen, onClose, children}: ModalProps) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null);

    /**
     * @function handleOnClickPreventClose
     * @description Prevent closing the modal when clicking inside the content area.
     * @event onClick
     * @author J. Trpka
     * @param {React.MouseEvent<HTMLDivElement>} e  
     */
    const handleOnClickPreventClose = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    return (
        <dialog 
            className={S.modal}
            ref={dialogRef} 
            open={isOpen ? true : undefined}
            onClick={onClose}
        >
            <div onClick={handleOnClickPreventClose}>
                <ModalHeader title={title} onClose={onClose} />
                <div className={S.modal__content}>
                    {children}
                </div>
            </div>
        </dialog>
    )
}

export default Modal;