import React from "react";
import S from './CompleteBet.module.css';
import ParticipantCheckbox from "../../common/field/participant-checkbox/ParticipantCheckbox";
import Modal from "../../common/modal/Modal";
import CompleteBetModalProps from "./CompleteBet.types";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import Button from "../../common/button/Button";

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

  const {completing} = useSelector((state: RootState) => state.bets);

  return (
    <Modal
      title="Complete Bet"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className={S.completeModal}>
        {completing ? (
          <section className={S.completeModal__info}>
            <h3>{completing.stipulation}</h3>
            <p>Hidemi: {completing.hidemiAnswer}</p>
            <p>Jeremy: {completing.jeremyAnswer}</p>
          </section>
        ) : null}

        <section className={S.completeModal__checkboxes}>
          <ParticipantCheckbox participant="Hidemi" checked={didHidemiWon} onChange={() => {setDidHidemiWon(!didHidemiWon)}} />
          <ParticipantCheckbox participant="Jeremy" checked={didJeremyWon} onChange={() => {setDidJeremyWon(!didJeremyWon)}} />
        </section>

        <section className={S.completeModal__buttons}>
          <Button type="submit" color="primary">Complete Bet</Button>
          <Button type="button" color="danger" onClick={() => onClose()}>Cancel</Button>
        </section>
      </form>
    </Modal>
  );
};

export default CompleteBetModal;