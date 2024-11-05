import S from './ParticipantCheckbox.module.css';

const ParticipantCheckbox = () => {
    return (
        <label className={S.participantCheckbox}>
            <input type="checkbox" />
            <div className={S.participantCheckbox_clickzone}>
                <p className={S.participantCheckbox_clickzone_participant}>Hello World</p>
            </div>
        </label>
    );
};

export default ParticipantCheckbox;