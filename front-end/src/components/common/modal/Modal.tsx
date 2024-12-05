import React from "react"
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
        <dialog ref={dialogRef} open={isOpen ? true : undefined}>
            {children}
        </dialog>
    )
}

export default Modal;