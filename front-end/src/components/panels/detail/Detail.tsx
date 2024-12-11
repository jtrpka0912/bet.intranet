import { useSelector } from "react-redux";
import Panel from "../../common/panel/Panel";
import { RootState } from "../../../store";

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
        <p>{detail.id}</p>
      ) : (
        <p>Click a bet to show its detail.</p>
      )}
    </Panel>
  );
};

export default DetailPanel;