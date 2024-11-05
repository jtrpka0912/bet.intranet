import S from './Button.module.css';
import { ButtonProps } from './Button.types';

/**
 * @function Button
 * @description A simple button component
 * @author J. Trpka
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
const Button = ({ children }: ButtonProps): JSX.Element => {
    return (
        <button className={S.button}>{ children }</button>
    );
};

export default Button;