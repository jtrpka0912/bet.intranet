import React from "react"

export type ButtonProps = {
    color?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    children: React.ReactNode;
}