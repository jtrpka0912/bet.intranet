import BetResponseDTO from "../dto/bet-response";
import PaginationResponseDTO from "../dto/pagination-response";
import ResponseDTO from "../dto/response";

// TODO: Change the URL after project is moved out of IDX
const URL = 'https://3000-idx-makeabet-1730228503135.cluster-pgviq6mvsncnqxx6kr7pbz65v6.cloudworkstations.dev';

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

    if(response.status !== 200 || json.error) {
        throw new Error(json.message);
    }

    return json;
}