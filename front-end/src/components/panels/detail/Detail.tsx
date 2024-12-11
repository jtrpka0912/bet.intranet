import S from './Detail.module.css';
import { useSelector } from "react-redux";
import Panel from "../../common/panel/Panel";
import { RootState } from "../../../store";
import { DetailFieldProps } from "./Detail.types";

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
 * @param {DetailPanelProps} props
 * @returns {JSX.Element}
 */
const DetailPanel = () => {
  const {detail} = useSelector((store: RootState) => store.bets);

  return (
    <Panel>
      {detail ? (
        <div>
          { new Date().getTime() > new Date(detail.endsAt).getTime()  ? (
            <p className={S.detailWarning}>This bet has ended, please complete to confirm!</p>
          ) : null}
          <DetailField label="Stipulation" value={detail.stipulation} />
          <DetailField label="Jeremy's Answer" value={detail.jeremyAnswer} />
          <DetailField label="Hidemi's Answer" value={detail.hidemiAnswer} />
          <DetailField label="Jeremy Bets" value={detail.jeremyBets} />
          <DetailField label="Hidemi Bets" value={detail.hidemiBets} />
          <DetailField label="Bet Ends At" value={new Date(detail.endsAt).toLocaleString()} />
        </div>
      ) : (
        <p>Click a bet to show its detail.</p>
      )}
    </Panel>
  );
};

export default DetailPanel;