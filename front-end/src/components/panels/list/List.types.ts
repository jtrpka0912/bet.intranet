import BetResponseDTO from "../../../dto/bet-response"

export type BetListProps = {
    bets: BetResponseDTO[];
};

export type BetItemProps = {
    bet: BetResponseDTO
};