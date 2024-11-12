import S from './ParticipantCheckbox.module.css';
import { ParticipantCheckboxProps } from './ParticipantCheckbox.types';

/**
 * @function ParticipantCheckbox
 * @description A stylized checkbox that is big and simply checks if participant won or not
 * @author J. Trpka
 * @param {string} participant
 * @returns {JSX.Element}
 */
const ParticipantCheckbox = ({ participant }: ParticipantCheckboxProps): JSX.Element => {
    return (
        <label className={S.participantCheckbox}>
            <input type="checkbox" />
            <div className={S.participantCheckbox_clickzone}>
                <p className={S.participantCheckbox_clickzone_participant}>{participant}</p>
                <p className={S.participantCheckbox_clickzone_won}>Did </p>
            </div>
        </label>
    );
};

export default ParticipantCheckbox;