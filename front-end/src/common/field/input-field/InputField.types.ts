import React from "react";

type InputFieldProps = {
    type: string;
    label: string;
    name: string;
    id: string;
    error?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export default InputFieldProps;