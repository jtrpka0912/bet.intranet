import BetResponseDTO from "../../../dto/bet-response"

export type BetItemProps = {
    bet: BetResponseDTO;
};

export type PaginatePayloadAction = {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
}