import ResponseDTO from "../models/dtos/response";
import BetCreateRequestDTO from "../models/dtos/bet-create-request";
import BetResponseDTO from "../models/dtos/bet-response";
import Bet from "../models/bet";
import GeneratedQuery from "../models/generated-query";
import CreateBetRequest from "../models/create-bet-request";

/**
 * @async
 * @function createBet
 * @description Create a bet by inserting a new row in the database
 * @author J. Trpka
 * @param {CreateBetRequest} request
 * @returns {Promise<ResponseDTO<BetResponseDTO>>}
 */
export const createBet = async (request: CreateBetRequest): Promise<ResponseDTO<BetResponseDTO>> => {
    console.info(request.dbClient);
    console.info('INFO: Creating Bet');
    const requestBody: BetCreateRequestDTO = request.body;

    const bet: Bet = Bet.fromRequest(requestBody);
    const queryData: GeneratedQuery = bet.generateQuery();

    return {
        error: false,
        message: null,
        data: {
            id: crypto.randomUUID(),
            stipulation: 'Stipulation',
            jeremyAnswer: 'Jeremy Answer',
            hidemiAnswer: 'Hidemi Answer',
            jeremyBets: 'Jeremy Bets',
            hidemiBets: 'Hidemi Bets',
            jeremyWon: null,
            hidemiWon: null,
            betEndsAt: new Date().toISOString(),
            completedAt: new Date().toISOString()
        }
    };
}