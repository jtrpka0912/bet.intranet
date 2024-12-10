import React from 'react';
import S from './CreateBet.module.css';
import InputField from "../../common/field/input-field/InputField";
import Modal from "../../common/modal/Modal";
import CreateBetModalProps from "./CreateBet.types";

const CreateBetForm = () => {
  const now = new Date();

  const [stipulation, setStipulation] = React.useState('');
  const [jeremyAnswer, setJeremyAnswer] = React.useState('');
  const [hidemiAnswer, setHidemiAnswer] = React.useState('');
  const [jeremyBet, setJeremyBet] = React.useState('');
  const [hidemiBet, setHidemiBet] = React.useState('');
  const [betEnds, setBetEnds] = React.useState(
    `${now.getFullYear()}-${now.getMonth()}-${now.getDate() + 1}T00:00:00.0`
  );

  return (
    <form className={S.createBetForm}>
      <InputField id="stipulation" required={true}>
        <InputField.Label>Stipulation</InputField.Label>
        <InputField.Input 
          type="text"
          name="stipulation"
          value={stipulation}
          onChange={(e) => setStipulation(e.target.value)}
        />
      </InputField>

      <InputField id="jeremy-answer" required={true}>
        <InputField.Label>Jeremy's Answer</InputField.Label>
        <InputField.TextArea
          name="jeremy-answer"
          value={jeremyAnswer}
          onChange={(e) => setJeremyAnswer(e.target.value)}
        />
      </InputField>

      <InputField id="hidemi-answer" required={true}>
        <InputField.Label>Hidemi's Answer</InputField.Label>
        <InputField.TextArea
          name="hidemi-answer"
          value={hidemiAnswer}
          onChange={(e) => setHidemiAnswer(e.target.value)}
        />
      </InputField>

      <InputField id="jeremy-bet" required={true}>
        <InputField.Label>Jeremy's Bet</InputField.Label>
        <InputField.TextArea
          name="jeremy-bet"
          value={jeremyBet}
          onChange={(e) => setJeremyBet(e.target.value)}
        />
      </InputField>

      <InputField id="hidemi-bet" required={true}>
        <InputField.Label>Hidemi's Bet</InputField.Label>
        <InputField.TextArea
          name="hidemi-bet"
          value={hidemiBet}
          onChange={(e) => setHidemiBet(e.target.value)}
        />
      </InputField>

      <InputField id="bet-ends" required={true}>
        <InputField.Label>Bet Ends</InputField.Label>
        <InputField.Input 
          type="datetime-local"
          name="bet-ends"
          value={betEnds}
          onChange={(e) => setBetEnds(e.target.value)}
        />
      </InputField>
    </form>
  );
}

/**
 * @function CreateBetModal
 * @description The create bet modal form
 * @author J. Trpka
 * @param {CreateBetModalProps} props
 * @returns {JSX.Element}
 */
const CreateBetModal = ({isOpen, onClose}: CreateBetModalProps) => {
  return (
    <Modal 
      title={"Create New Bet"} 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <CreateBetForm />
    </Modal>
  );
};

export default CreateBetModal;