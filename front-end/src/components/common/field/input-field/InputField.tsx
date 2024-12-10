import React from 'react';
import S from './InputField.module.css';
import { InputFieldContextProps, InputFieldProps, InputLabelProps, TextInputProps, TextAreaProps, DateTimeInputProps } from './InputField.types';

const InputFieldContext = React.createContext<InputFieldContextProps | null>(null);

/**
 * @function useInputFieldContext
 * @description A custom hook to use the input field context
 * @author J. Trpka
 * @returns {}
 */
const useInputFieldContext = () => {
    const context = React.useContext(InputFieldContext) as InputFieldContextProps;
    if(!context) {
        throw new Error('Unable to fulfill requirements for input field');
    }

    return context;
}

/**
 * @function TextInput
 * @description A simple text input field
 * @author J. Trpka
 * @param {TextInputProps} props 
 * @returns {JSX.Element}
 */
const TextInput = ({
    name,
    value,
    onChange
}: TextInputProps) => {
    const {id, required} = useInputFieldContext();

    return (
        <input 
            type="text" 
            name={name}
            id={id}
            value={value}
            required={required ? true : undefined}
            aria-required={required ? true : undefined}
            onChange={onChange}
        />
    )
}

/**
 * @function DateTimeInput
 * @description The datetime input field
 * @author J. Trpka
 * @param {TextInputProps} props 
 * @returns {JSX.Element}
 */
const DateTimeInput = ({
    name,
    value,
    min,
    max,
    onChange
}: DateTimeInputProps) => {
    const {id, required} = useInputFieldContext();

    return (
        <input 
            type="datetime-local" 
            name={name}
            id={id}
            value={value}
            required={required ? true : undefined}
            aria-required={required ? true : undefined}
            min={min ? min : undefined}
            max={max ? max : undefined}
            onChange={onChange}
        />
    )
}

/**
 * @function TextArea
 * @description The simple text area field
 * @author J. Trpka
 * @param {InputProps} props 
 * @returns {JSX.Element}
 */
const TextArea = ({
    name,
    value,
    onChange
}: TextAreaProps) => {
    const {id, required} = useInputFieldContext();

    return (
        <textarea 
            name={name}
            id={id}
            value={value}
            required={required ? true : undefined}
            aria-required={required ? true : undefined}
            onChange={onChange}
        />
    );
};

/**
 * @function Label
 * @description The input field label
 * @author J. Trpka
 * @param {InputLabelProps} props
 * @returns {JSX.Element}
 */
const Label = ({ children }: InputLabelProps) => {
    const {id, required} = useInputFieldContext();

    return (
        <label htmlFor={id}>{children} { required ? <span className={S.inputField_asterick}>*</span> : null }</label>
    );
};

/**
 * @function InputField
 * @description A wrapper component to house the input label and field.
 * @author J. Trpka
 * @param {InputFieldProps} props
 * @returns {JSX.Element}
 */
const InputField = ({
    id,
    required,
    children
}: InputFieldProps) => {
    return (
        <InputFieldContext.Provider value={{id, required}}>
            <div className={S.inputField}>
                {children}
            </div>
        </InputFieldContext.Provider>
        
    );
};

InputField.Label = Label;
InputField.TextInput = TextInput;
InputField.DateTimeInput = DateTimeInput;
InputField.TextArea = TextArea;

export default InputField;