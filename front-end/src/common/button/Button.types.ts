import React from "react"

export type ButtonProps = {
    color?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    title?: string;
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}