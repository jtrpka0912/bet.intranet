import React from 'react';
import S from './List.module.css';
import BetResponseDTO from '../../../dto/bet-response';
import Panel from '../../common/panel/Panel';
import { BetItemProps } from './List.types';
import { retrieveBets } from '../../../api/bets';
import ResponseDTO from '../../../dto/response';
import PaginationResponseDTO from '../../../dto/pagination-response';
import Button from '../../common/button/Button';
import CreateBetModal from '../../modals/create-bet/CreateBet';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { failedRetrievingBets, paginate, processRetrievingBets, selectBetCompletion, selectBetDetail, successRetrievingBets, unselectBetCompletion } from '../../../reducers/bets';
import CompleteBetModal from '../../modals/complete-bet/CompleteBet';
import Pagination from '../../common/pagination/Pagination';

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
    const dispatch = useDispatch();

    /**
     * @function handleOnClickDetailBet
     * @description Select the bet to show on the detail panel
     * @event onClick
     * @author J. Trpka
     */
    const handleOnClickDetailBet = () => {
        dispatch(selectBetDetail(bet));
    }

    /**
     * @function handleOnClickCompleteBet
     * @description Select the bet to complete
     * @event onClick
     * @author J. Trpka
     */
    const handleOnClickCompleteBet = () => {
        dispatch(selectBetCompletion(bet));
    }

    return (
        <li className={S.listItem}>
            <h2
                className={`${S.listItem__header} ${bet.completedAt ? S.listItem__header_completed : ''}`}
            >{bet.stipulation}</h2>

            <div className={S.listItem__actions}>
                { bet.completedAt ? (
                    <div className={S.listItem__winners}>
                        {bet.jeremyWon ? (<span>J</span>) : null}
                        {bet.hidemiWon ? (<span>H</span>) : null}
                        {!bet.jeremyWon && !bet.hidemiWon ? (
                            <span className={S.listItem__winners__noWinner}>X</span>
                        ) : null}
                    </div>
                ) : null }
                
                <div className={S.listItem__buttons}>
                    <Button 
                        type="button"
                        color="primary"
                        size="small"
                        onClick={handleOnClickDetailBet}
                    >Detail</Button>

                    {!bet.completedAt ? (
                        <Button 
                            type="button"
                            color="secondary"
                            size="small"
                            onClick={handleOnClickCompleteBet}
                        >Complete</Button>
                    ) : null}
                </div>
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
const BetList = () => {
    const {bets} = useSelector((state: RootState) => state.bets);

    if(bets.length === 0) {
        return <p className={S.listMessage}>No Bets Found</p>
    }

    return (
        <ul className={S.list}>
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
    const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false);

    const betState = useSelector((state: RootState) => state.bets);
    const dispatch = useDispatch();

    React.useEffect(() => {
        retrievePaginatedBets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * @async
     * @function retrievePaginatedBets
     * @description Retrieve a paginated amount of bets
     * @author J. Trpka
     * @param {number} page 
     * @param {number} limit 
     */
    const retrievePaginatedBets = async (page: number = betState.currentPage, limit: number = betState.limit) => {
        try {
            dispatch(processRetrievingBets());
            const response: ResponseDTO<PaginationResponseDTO<BetResponseDTO>> = await retrieveBets(page, limit);

            console.info(response);

            const betItems = response.data.items;
            dispatch(successRetrievingBets(response.data.items));
        
            // If no bets, then automatically open the create bet modal form
            if(betItems.length === 0) {
                setIsCreateOpen(true);
            }

            dispatch(paginate({
                totalItems: response.data.count,
                limit: response.data.limit,
                currentPage: response.data.page,
                totalPages: response.data.pages
            }));
        } catch(e) {
            dispatch(failedRetrievingBets('Something happened retrieving the bets'));
            console.error(e);
        }
    }

    /**
     * @async
     * @function handleOnPaginate
     * @description Set the new page for retrieving bets
     * @author J. Trpka
     * @param {number} newPage
     */
    const handleOnPaginate = async (newPage: number) => {
        await retrievePaginatedBets(newPage);
    }

    return (
        <React.Fragment>
            <Panel>
                <div className={S.listPanel}>
                    <div>
                        <Button 
                            type="button"
                            onClick={() => setIsCreateOpen(true)} 
                        >Create Bet</Button>

                        {betState.retrievingError ? (
                            <p className={`${S.listMessage} ${S.listError}`}>{betState.retrievingError}</p>
                        ) : null}
                        
                        {betState.isRetrieving ? (
                            <p className={S.listMessage}>Retrieving Bets...</p>
                        ) : (
                            <BetList />
                        )}
                    </div>
                    
                    <Pagination 
                        totalItems={betState.totalItems} 
                        currentPage={betState.currentPage}
                        totalPages={betState.totalPages}
                        onPaginate={handleOnPaginate}
                    />
                </div>
            </Panel>

            <CreateBetModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
            <CompleteBetModal isOpen={!!betState.completing} onClose={() => dispatch(unselectBetCompletion())} />
        </React.Fragment>
        
    );
};

export default ListPanel;