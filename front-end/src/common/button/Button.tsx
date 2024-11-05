import S from './Button.module.css';
import { ButtonProps } from './Button.types';

/**
 * @function Button
 * @description A simple button component
 * @author J. Trpka
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
const Button = ({ 
    color = 'primary',
    children 
}: ButtonProps): JSX.Element => {

    /**
     * @function generateColorClass
     * @description Get the color class for the button colors
     * @author J. Trpka
     * @returns {string}
     */
    const generateColorClass = (): string => {
        switch(color) {
            case 'danger': return S.button__danger;
            case 'secondary': return S.button__secondary;
            case 'primary':
            default: return S.button__primary;
        }
    }

    /**
     * @function generateClasses
     * @description Generate the string of classes from the other generators
     * @author J. Trpka
     * @returns {string}
     */
    const generateClasses = (): string => {
        return [S.button, generateColorClass()].join(' ');
    }

    return (
        <button className={generateClasses()}>{ children }</button>
    );
};

export default Button;