import S from './InputField.module.css';

/**
 * @function InputField
 * @description An input field that can be an input, textarea, or a select drop down
 * @author J. Trpka
 * @returns {JSX.Element} 
 */
const InputField = () => {
    return (
        <div className={S.inputField}>
            <input type="text" />
        </div>
    );
};

export default InputField;