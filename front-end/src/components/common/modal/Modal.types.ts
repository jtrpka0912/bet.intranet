import React from "react";

export type ModalProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export type ModalHeaderProps = {
    title: string;
    onClose: () => void;
};