import BetResponseDTO from "../dto/bet-response";
import CreateBetRequestBodyDTO from "../dto/create-bet-request-body";
import PaginationResponseDTO from "../dto/pagination-response";
import ResponseDTO from "../dto/response";

// TODO: Change the URL after project is moved out of IDX
const URL = 'https://3000-idx-makeabet-1730228503135.cluster-pgviq6mvsncnqxx6kr7pbz65v6.cloudworkstations.dev';
const STATUS_OK = 200;
const STATUS_CREATED = 201;

/**
 * @exports
 * @async
 * @function retrieveBets
 * @description Retrieve bets from the backend
 * @author J. Trpka
 * @param {number} page 
 * @param {number} limit
 * @returns {Promise<ResponseDTO<PaginationResponseDTO<BetResponseDTO>>>} 
 */
export const retrieveBets = async (page: number = 0, limit: number = 20): Promise<ResponseDTO<PaginationResponseDTO<BetResponseDTO>>> => {
    const response: Response = await fetch(`${URL}/api/v1/bets?page=${page}&limit=${limit}`, {
        credentials: 'include' // Added for IDX, may check if I still need this option for retrieving bets.
    });

    const json: ResponseDTO<PaginationResponseDTO<BetResponseDTO>> = await response.json();

    if(response.status !== STATUS_OK || json.error) {
        throw new Error(json.message);
    }

    return json;
}

/**
 * @function createBet
 * @description Create a bet from the backend
 * @author J. Trpka
 * @param {CreateBetRequestBodyDTO} bet 
 * @returns {Promise<ResponseDTO<BetResponseDTO>>}
 */
export const createBet = async (bet: CreateBetRequestBodyDTO): Promise<ResponseDTO<BetResponseDTO>> => {
    const response: Response = await fetch(`${URL}/api/v1/bets`, {
        method: 'POST',
        body: JSON.stringify(bet),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // Added for IDX, may check if I still need this option for retrieving bets.
    });

    const json: ResponseDTO<BetResponseDTO> = await response.json();

    if(response.status !== STATUS_CREATED || json.error) {
        throw new Error(json.message);
    }

    return json;
}