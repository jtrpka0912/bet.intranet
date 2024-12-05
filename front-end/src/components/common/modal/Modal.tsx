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

    return (
        <dialog 
            className={S.modal}
            ref={dialogRef} 
            open={isOpen ? true : undefined}
        >
            {children}
        </dialog>
    )
}

export default Modal;