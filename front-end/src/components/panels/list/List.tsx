import BetResponseDTO from '../../../dto/bet-response';
import Panel from '../../common/panel/Panel';
import { BetListProps } from './List.types';

/**
 * @function BetList
 * @description A list of bets
 * @author J. Trpka
 * @param {BetListProps} props
 * @returns {JSX.Element}
 */
const BetList = ({
    bets = []
}: BetListProps) => {
    return (
        <ul>
            {bets.map((bet: BetResponseDTO, i: number) => {
                return (
                    <li key={i}>{bet.stipulation}</li>
                )
            })}
        </ul>
    );
};

/**
 * @function ListPanel
 * @description The panel that holds the list of bets
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const ListPanel = () => {
    return (
        <Panel>
            <BetList bets={[]} />
        </Panel>
    );
};

export default ListPanel;