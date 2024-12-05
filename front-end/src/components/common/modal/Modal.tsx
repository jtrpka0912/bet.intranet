import React from "react"
import S from './Modal.module.css';
import ModalProps from "./Modal.types";

/**
 * @function Modal
 * @description The basic modal wrapper component
 * @author J. Trpka
 * @param {props} ModalProps
 * @returns {JSX.Element}
 */
const Modal = ({isOpen, onClose, children}: ModalProps) => {
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
                {children}
            </div>
        </dialog>
    )
}

export default Modal;