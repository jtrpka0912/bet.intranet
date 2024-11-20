import React from 'react';
import S from './List.module.css';
import BetResponseDTO from '../../../dto/bet-response';
import Panel from '../../common/panel/Panel';
import { BetItemProps, BetListProps } from './List.types';
import { retrieveBets } from '../../../api/bets';
import ResponseDTO from '../../../dto/response';
import PaginationResponseDTO from '../../../dto/pagination-response';
import Button from '../../common/button/Button';

/**
 * @function BetItem
 * @description A single bet item for the list
 * @author J. Trpka
 * @param {BetResponseDTO} bet
 * @returns {JSX.Element}
 */
const BetItem = ({
    bet
}: BetItemProps) => {
    return (
        <li className={S.listItem}>
            <h2>{bet.stipulation}</h2>

            <div className={S.listItem__winners}>
                <span>J</span>
                <span>H</span>
                <span>X</span>
            </div>

            <div className={S.listItem__buttons}>
                <Button 
                    color="primary"
                    size="small"
                    onClick={() => console.info(bet)}
                >Detail</Button>

                <Button 
                    color="secondary"
                    size="small"
                    onClick={() => console.info(bet)}
                >Complete</Button>
            </div>
        </li>
    );
};

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
            {bets.map((bet: BetResponseDTO) => {
                return (
                    <BetItem key={bet.id} bet={bet} />
                )
            })}
        </ul>
    );
};

/**
 * @function ListPanel
 * @description The panel that holds the list of bets and other functions
 * @author J. Trpka
 * @returns {JSX.Element}
 */
const ListPanel = () => {
    const [bets, setBets] = React.useState<BetResponseDTO[]>([]);

    React.useEffect(() => {
        retrievePaginatedBets();
    }, []);

    /**
     * @async
     * @function retrievePaginatedBets
     * @description Retrieve a paginated amount of bets
     * @author J. Trpka
     * @param {number} page 
     * @param {number} limit 
     */
    const retrievePaginatedBets = async (page: number = 0, limit: number = 20) => {
        try {
            const response: ResponseDTO<PaginationResponseDTO<BetResponseDTO>> = await retrieveBets(page, limit);

            // TODO: Take care of the pagination data later.

            setBets(response.data.items);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <Panel>
            <BetList bets={bets} />
        </Panel>
    );
};

export default ListPanel;