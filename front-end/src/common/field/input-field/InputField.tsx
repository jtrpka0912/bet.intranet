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
    required
}: InputFieldProps) => {
    return (
        <div className={S.inputField}>
            <label>This is a label { required ? <span className={S.inputField_asterick}>*</span> : null }</label>
            <input 
                type="text" 
                required={required ? true : undefined}
                aria-required={required ? true : undefined}
            />
        </div>
    );
};

export default InputField;