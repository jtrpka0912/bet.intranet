import BetResponseDTO from "../dto/bet-response";
import PaginationResponseDTO from "../dto/pagination-response";
import ResponseDTO from "../dto/response";

const URL = 'http://localhost:3000';

/**
 * @exports
 * @async
 * @function retrieveBets
 * @description Retrieve bets from the backend
 * @author J. Trpka
 * @param {number} page 
 * @param {number} limit 
 */
export const retrieveBets = async (page: number = 0, limit: number = 20) => {
    try {
        const response: Response = await fetch(`${URL}/api/v1/bets?page=${page}&limit=${limit}`);
        console.info(response);

        const json: ResponseDTO<PaginationResponseDTO<BetResponseDTO>> = await response.json();
        console.info(json);
    } catch(e) {
        console.error(e);
    }
}