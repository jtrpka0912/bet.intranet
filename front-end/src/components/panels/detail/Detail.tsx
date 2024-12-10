import Panel from "../../common/panel/Panel"
import { DetailPanelProps } from "./Detail.types"

/**
 * @function DetailPanel
 * @description Show the information of a bet
 * @author J. Trpka
 * @param {DetailPanelProps} props
 * @returns {JSX.Element}
 */
const DetailPanel = ({bet}: DetailPanelProps) => {
  return (
    <Panel>
      {bet ? (
        <p>Show new props</p>
      ) : (
        <p>Click a bet to show its detail.</p>
      )}
    </Panel>
  );
};

export default DetailPanel;