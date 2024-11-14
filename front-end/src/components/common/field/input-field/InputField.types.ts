import React from "react";

export type InputProps = {
    type: 'text' | 'textarea';
    name: string;
    id: string;
    error?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export type TextAreaProps = {
    name: string;
    id: string;
    error?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

type InputFieldProps = {
    type: 'text' | 'textarea';
    label: string;
    name: string;
    id: string;
    error?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export default InputFieldProps;