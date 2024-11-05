import S from './Button.module.css';

/**
 * @function Button
 * @description A simple button component
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const Button = () => {
    return (
        <button className={S.button}>Button</button>
    );
};

export default Button;