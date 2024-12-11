import React from "react";
import S from './CompleteBet.module.css';
import ParticipantCheckbox from "../../common/field/participant-checkbox/ParticipantCheckbox";
import Modal from "../../common/modal/Modal";
import CompleteBetModalProps from "./CompleteBet.types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import Button from "../../common/button/Button";
import { completeBet } from "../../../api/bets";
import { failedCompletingBet, successCompletingBet, unselectBetCompletion } from "../../../reducers/bets";

/**
 * @function CompleteBetModal
 * @description The complete bet modal form
 * @author J. Trpka
 * @param props
 * @returns {JSX.Element}
 */
const CompleteBetModal = ({isOpen, onClose}: CompleteBetModalProps) => {
  const [didJeremyWon, setDidJeremyWon] = React.useState<boolean>(false);
  const [didHidemiWon, setDidHidemiWon] = React.useState<boolean>(false);

  const {completing, isCompleting, completingError} = useSelector((state: RootState) => state.bets);
  const dispatch = useDispatch();
  
  /**
   * @async
   * @function handleOnSubmit
   * @description Submit and complete the bet
   * @event onSubmit
   * @author J. Trpka
   * @param {string} id
   */
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    try {
      const response = await completeBet(id, {
        hidemiWon: didHidemiWon,
        jeremyWon: didJeremyWon
      });

      // Reset form, though maybe unnecessary
      setDidHidemiWon(false);
      setDidJeremyWon(false);

      dispatch(successCompletingBet(response.data));
      dispatch(unselectBetCompletion());
    } catch(error) {
      console.error(error);
      dispatch(failedCompletingBet('Something went wrong completing the bet'));
    }
  }

  return (
    <Modal
      title="Complete Bet"
      isOpen={isOpen}
      onClose={onClose}
    >
      {completing ? (
        <form className={S.completeModal} onSubmit={(e) => handleOnSubmit(e, completing.id)}>  
          {completingError ? (
            <p>{completingError}</p>
          ) : null}
          
          <section className={S.completeModal__info}>
            <h3>{completing.stipulation}</h3>
            <p>Hidemi: {completing.hidemiAnswer}</p>
            <p>Jeremy: {completing.jeremyAnswer}</p>
          </section>
          

          <section className={S.completeModal__checkboxes}>
            <ParticipantCheckbox participant="Hidemi" checked={didHidemiWon} onChange={() => {setDidHidemiWon(!didHidemiWon)}} />
            <ParticipantCheckbox participant="Jeremy" checked={didJeremyWon} onChange={() => {setDidJeremyWon(!didJeremyWon)}} />
          </section>

          <section className={S.completeModal__buttons}>
            <Button type="submit" color="primary" disabled={isCompleting}>{isCompleting ? 'Completing Bet' : 'Complete Bet'}</Button>
            <Button type="button" color="danger" onClick={() => onClose()}>Cancel</Button>
          </section>
        </form>
      ) : null}
    </Modal>
  );
};

export default CompleteBetModal;