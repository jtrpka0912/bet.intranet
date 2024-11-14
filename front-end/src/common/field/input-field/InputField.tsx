import S from './InputField.module.css';
import InputFieldProps from './InputField.types';

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
    return (
        <div className={`${S.inputField} ${error ? S.inputField__error : null}`}>
            { error ? (
                <div className={S.inputField_errorIcon}>
                </div>
            ) : null }

            <div className={S.inputField_wrapper}>
                <label htmlFor={id}>{label} { required ? <span className={S.inputField_asterick}>*</span> : null }</label>

                <input 
                    type={type} 
                    name={name}
                    id={id}
                    value={value}
                    required={required ? true : undefined}
                    aria-required={required ? true : undefined}
                    onChange={onChange}
                />

                { error ? (
                    <p className={S.inputField_errorMessage}>{error}</p>
                ) : null }
            </div>
        </div>
    );
};

export default InputField;