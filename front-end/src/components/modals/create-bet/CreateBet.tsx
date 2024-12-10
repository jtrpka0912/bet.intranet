import React from 'react';
import S from './CreateBet.module.css';
import InputField from "../../common/field/input-field/InputField";
import Modal from "../../common/modal/Modal";
import {CreateBetModalProps, CreateBetFormProps} from "./CreateBet.types";
import { createBet } from '../../../api/bets';
import Button from '../../common/button/Button';

/**
 * @function CreateBetForm
 * @description Create a new bet form
 * @author J. Trpka
 * @param {CreateBetFormProps} props
 * @returns {JSX.Element}
 */
const CreateBetForm = ({onSuccess, onError}: CreateBetFormProps) => {
  const now = new Date();
  const nextDay = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 1}T00:00:00.0`;

  const [stipulation, setStipulation] = React.useState('');
  const [jeremyAnswer, setJeremyAnswer] = React.useState('');
  const [hidemiAnswer, setHidemiAnswer] = React.useState('');
  const [jeremyBets, setJeremyBets] = React.useState('');
  const [hidemiBets, setHidemiBets] = React.useState('');
  const [endsAt, setEndsAt] = React.useState(nextDay);

  /**
   * @async
   * @function handleOnSubmit
   * @description Submit the data to the backend
   * @event onSubmit
   * @author J. Trpka
   */
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const possibleErrors = [];

      if(!stipulation.trim()) possibleErrors.push('Stipulation is required');
      if(!jeremyAnswer.trim()) possibleErrors.push('Jeremy Answer is required');
      if(!hidemiAnswer.trim()) possibleErrors.push('Hidemi Answer is required');
      if(!jeremyBets.trim()) possibleErrors.push('Jeremy Bets is required');
      if(!hidemiBets.trim()) possibleErrors.push('Hidemi Bets is required');
      if(!endsAt) possibleErrors.push('Ends at date is required');

      if(now.getTime() > new Date(endsAt).getTime()) possibleErrors.push('Ends at must be greater than now');

      if(possibleErrors.length > 0) {
        onError(possibleErrors[0]);
        return; // Can't rely on throwing an error
      }

      await createBet({
        stipulation,
        jeremyAnswer,
        hidemiAnswer,
        jeremyBets,
        hidemiBets,
        endsAt
      });

      onSuccess();
    } catch(e) {
      console.error(e);
      onError('Something went wrong');
    }
  }

  /**
   * @function handleOnReset
   * @description Reset the values of the form
   * @event onReset
   * @author J. Trpka
   */
  const handleOnReset = () => {
    setStipulation('');
    setJeremyAnswer('');
    setHidemiAnswer('');
    setJeremyBets('');
    setHidemiBets('');
    setEndsAt(nextDay);
  }

  return (
    <form className={S.createBetForm} onSubmit={(e) => handleOnSubmit(e)} onReset={handleOnReset}>
      <InputField id="stipulation" required={true}>
        <InputField.Label>Stipulation</InputField.Label>
        <InputField.TextInput
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

      <InputField id="jeremy-bets" required={true}>
        <InputField.Label>Jeremy's Bet</InputField.Label>
        <InputField.TextArea
          name="jeremy-bets"
          value={jeremyBets}
          onChange={(e) => setJeremyBets(e.target.value)}
        />
      </InputField>

      <InputField id="hidemi-bets" required={true}>
        <InputField.Label>Hidemi's Bet</InputField.Label>
        <InputField.TextArea
          name="hidemi-bets"
          value={hidemiBets}
          onChange={(e) => setHidemiBets(e.target.value)}
        />
      </InputField>

      <InputField id="ends-at" required={true}>
        <InputField.Label>Ends At</InputField.Label>
        <InputField.DateTimeInput
          name="ends-at"
          value={endsAt}
          min={`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes() - 1}`}
          onChange={(e) => setEndsAt(e.target.value)}
        />
      </InputField>

      <div className={S.createBetForm__buttons}>
        <Button type="submit">Create Bet</Button>
        <Button type="reset" color="danger">Reset Form</Button>
      </div>
      
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
  const [error, setError] = React.useState('');

  return (
    <Modal 
      title={"Create New Bet"} 
      isOpen={isOpen} 
      onClose={onClose}
    >
      {error ? (
        <p className={S.createBetError}>{error}</p>
      ) : null}
      <CreateBetForm onSuccess={onClose} onError={(error) => setError(error)} />
    </Modal>
  );
};

export default CreateBetModal;