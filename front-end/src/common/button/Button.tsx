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
    size = 'medium',
    disabled = false,
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
     * @function generateSizeClass
     * @description Get the size class for the button sizes
     * @author J. Trpka
     * @returns {string}
     */
    const generateSizeClass = (): string => {
        switch(size) {
            case 'large': return S.button__large;
            case 'small': return S.button__small;
            case 'medium':
            default: return S.button__medium;
        }
    }

    /**
     * @function generateClasses
     * @description Generate the string of classes from the other generators
     * @author J. Trpka
     * @returns {string}
     */
    const generateClasses = (): string => {
        return [
            S.button, 
            generateColorClass(),
            generateSizeClass()
        ].join(' ');
    }

    return (
        <button 
            className={generateClasses()}
            disabled={disabled ? true : undefined}
            aria-disabled={disabled ? true : undefined}
        >{ children }</button>
    );
};

export default Button;