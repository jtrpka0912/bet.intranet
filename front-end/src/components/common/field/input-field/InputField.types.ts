import React from "react";

export type InputFieldProps = {
    id: string;
    required?: boolean;
    children: React.ReactNode;
}

export type InputFieldContextProps = {
    id: string;
    required?: boolean;
}

export type InputLabelProps = {
    children: React.ReactNode;
}

export type InputProps = {
    type: 'text' | 'datetime-local';
    name: string;
    value: string;
    min?: string;
    max?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TextAreaProps = {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};