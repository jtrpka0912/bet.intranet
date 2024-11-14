import S from './Panel.module.css';
import PanelProps from "./Panel.types";

/**
 * @function Panel
 * @description A section of content
 * @author J. Trpka
 * @param {PanelProps} props
 * @returns {JSX.Element}
 */
const Panel = ({
    children
}: PanelProps) => {
    return (
        <section className={S.panel}>
            {children}
        </section>
    );
};

export default Panel;