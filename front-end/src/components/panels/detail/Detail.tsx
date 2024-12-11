import S from './Detail.module.css';
import { useSelector } from "react-redux";
import Panel from "../../common/panel/Panel";
import { RootState } from "../../../store";
import { DetailFieldProps, WinnerFieldProps } from "./Detail.types";

/**
 * @function WinnerField
 * @description Show the winner, if any, for the bet
 * @author J. Trpka
 * @param {WinnerFieldProps} props
 * @returns {JSX.Element}
 */
const WinnerField = ({bet}: WinnerFieldProps) => {

  /**
   * @function wonMessage
   * @description A paragraph component that shows the winning, if any, message.
   * @author J. Trpka
   * @returns {string}
   */
  const wonMessage = (): string => {
    if(bet.jeremyWon && bet.hidemiWon) return 'Both Hidemi and Jeremy won the bet!';
    if(bet.jeremyWon) return 'Jeremy won the bet!';
    if(bet.hidemiWon) return 'Hidemi won the bet!';

    return 'No one won the bet!';
  }

  return (
    <div className={S.winnerField}>
      <p>{wonMessage()}</p>
    </div>
  )
};

/**
 * @function DetailField
 * @description A simple component to show the label and the value for the field
 * @author J. Trpka
 * @param props
 * @returns 
 */
const DetailField = ({label, value}: DetailFieldProps) => {
  return (
    <dl className={S.detailField}>
      <dt><h3>{label}</h3></dt>
      <dd><p>{value}</p></dd>
    </dl>
  );
};

/**
 * @function DetailPanel
 * @description Show the information of a bet
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const DetailPanel = () => {
  const {detail} = useSelector((store: RootState) => store.bets);

  return (
    <Panel>
      {detail ? (
        <div className={S.detailPanel}>
          { new Date().getTime() > new Date(detail.endsAt).getTime()  ? (
            <section>
              <p className={S.detailWarning}>This bet has ended, please complete to confirm!</p>
            </section>
          ) : null}

          <section>
            <DetailField label="Stipulation" value={detail.stipulation} />
            <DetailField label="Jeremy's Answer" value={detail.jeremyAnswer} />
            <DetailField label="Hidemi's Answer" value={detail.hidemiAnswer} />
            <DetailField label="Jeremy Bets" value={detail.jeremyBets} />
            <DetailField label="Hidemi Bets" value={detail.hidemiBets} />
            <DetailField label="Bet Ends At" value={new Date(detail.endsAt).toLocaleString()} />
            {detail.completedAt ? (
              <DetailField label="Completed At" value={new Date(detail.completedAt).toLocaleString()} />
            ) : null}
          </section>
          
          <section>
            {detail.completedAt ? (
              <WinnerField bet={detail} />
            ) : null}
          </section>
        </div>
      ) : (
        <p>Click a bet to show its detail.</p>
      )}
    </Panel>
  );
};

export default DetailPanel;