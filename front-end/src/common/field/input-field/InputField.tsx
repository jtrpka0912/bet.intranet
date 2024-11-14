import S from './InputField.module.css';
import InputFieldProps, { InputProps } from './InputField.types';

/**
 * @function Input
 * @description The simple input field with variable type
 * @author J. Trpka
 * @param {InputProps} props 
 * @returns {JSX.Element}
 */
const Input = ({
    type,
    name,
    id,
    value,
    required,
    onChange
}: InputProps) => {
    return (
        <input 
            type={type} 
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
 * @function InputField
 * @description An input field that can be an input, textarea, or a select drop down
 * @author J. Trpka
 * @param {InputFieldProps} props
 * @returns {JSX.Element} 
 */
const InputField = ({
    type = "text",
    label,
    name,
    id,
    value,
    error,
    required,
    onChange
}: InputFieldProps) => {
    const RenderField = () => {
        switch(type) {
            case 'textarea':
                return null;
            case 'text':
            default:
                return <Input 
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    required={required}
                    onChange={onChange}
                />
        }
    }

    return (
        <div className={`${S.inputField} ${error ? S.inputField__error : null}`}>
            { error ? (
                <div className={S.inputField_errorIcon}>
                </div>
            ) : null }

            <div className={S.inputField_wrapper}>
                <label htmlFor={id}>{label} { required ? <span className={S.inputField_asterick}>*</span> : null }</label>

                <RenderField />

                { error ? (
                    <p className={S.inputField_errorMessage}>{error}</p>
                ) : null }
            </div>
        </div>
    );
};

export default InputField;