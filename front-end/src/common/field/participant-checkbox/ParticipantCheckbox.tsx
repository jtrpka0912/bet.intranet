import S from './ParticipantCheckbox.module.css';

/**
 * @function ParticipantCheckbox
 * @description A stylized checkbox that is big and simply checks if participant won or not
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const ParticipantCheckbox = (): JSX.Element => {
    return (
        <label className={S.participantCheckbox}>
            <input type="checkbox" />
            <div className={S.participantCheckbox_clickzone}>
                <p className={S.participantCheckbox_clickzone_participant}>Hello World</p>
                <p className={S.participantCheckbox_clickzone_won}>Did </p>
            </div>
        </label>
    );
};

export default ParticipantCheckbox;