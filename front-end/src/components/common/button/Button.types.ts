import React from "react"

export type ButtonProps = {
    type: 'button' | 'submit' | 'reset';
    color?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large' | 'full';
    title?: string;
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}