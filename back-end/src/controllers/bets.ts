import BetCreateRequestDTO from "../models/dtos/bet-create-request";
import Bet from "../models/bet";
import GeneratedQuery from "../models/generated-query";
import CreateBetRequest from "../models/dtos/fastify-requests/create-bet-request";
import { QueryResult } from "pg";
import { FastifyReply, FastifyRequest } from "fastify";
import ResponseDTO from "../models/dtos/response";
import BetResponseDTO from "../models/dtos/bet-response";
import BetPaginationResponseDTO from "../models/dtos/bet-pagination-response";
import CompleteBetRequest from "../models/dtos/fastify-requests/complete-bet-request";
import BetCompleteRequestDTO from "../models/dtos/bet-complete-request";
import BetCompleteCheckQueryResult from "../models/dtos/query-results/bet-complete-check";

/**
 * @async
 * @function retrieveBets
 * @description Retrieve a pagination set of bets
 * @author J. Trpka
 * @param {FastifyRequest} request 
 * @param {FastifyReply} reply
 */
export const retrieveBets = async (request: FastifyRequest, reply: FastifyReply) => {
    request.log.info('INFO: Retrieving Bets');

    const page: string = request.query['page'] || '0';
    const limit: string = request.query['limit'] || '20';

    // Retrieve the total count of bets
    const countResult: QueryResult = await request.server.dbClient.query(
        `SELECT COUNT(id) AS count FROM bets`
    );

    // Retrieve a paginated set of bets
    // TODO: Change the colum names to be more approriate with the Bet Response DTO
    const result: QueryResult<BetResponseDTO> = await request.server.dbClient.query(
        `SELECT 
            id, 
            stipulation, 
            jeremy_answer, 
            hidemi_answer,
            jeremy_bets,
            hidemi_bets,
            jeremy_won,
            hidemi_won,
            bet_ends_at,
            completed_at
        FROM bets
        LIMIT $1 OFFSET $2`,
        [limit, page]
    );

    const count: number = parseInt(countResult.rows[0].count);

    const response: ResponseDTO<BetPaginationResponseDTO<BetResponseDTO>> = {
        error: false,
        message: null,
        data: {
            count,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(count/parseInt(limit)),
            items:  result.rows
        }
    }

    return reply.send(response).code(200);
}

/**
 * @async
 * @function createBet
 * @description Create a bet by inserting a new row in the database
 * @author J. Trpka
 * @param {CreateBetRequest} request
 * @param {FastifyReply} reply
 */
export const createBet = async (request: CreateBetRequest, reply: FastifyReply) => {
    request.log.info('INFO: Creating a Bet');

    const requestBody: BetCreateRequestDTO = request.body;
    const bet: Bet = Bet.fromRequest(requestBody);

    if(bet.validate().hasErrors()) {
        throw new Error(bet.validate().error);
    }

    const queryData: GeneratedQuery = bet.generateQuery();

    const result: QueryResult = await request.server.dbClient.query(
        queryData.query, 
        queryData.values
    );

    if(!result.rowCount) {
        throw new Error('Unable to create new Bet record');
    }

    const response: ResponseDTO<BetResponseDTO> = {
        error: false,
        message: null,
        data: {
            id: bet.id,
            stipulation: bet.stipulation,
            jeremyAnswer: bet.jeremy.answer,
            hidemiAnswer: bet.hidemi.answer,
            jeremyBets: bet.jeremy.bets,
            hidemiBets: bet.hidemi.bets,
            jeremyWon: bet.jeremy.didWon,
            hidemiWon: bet.hidemi.didWon,
            betEndsAt: bet.betEndsAt.toISOString(),
            completedAt: bet.completedAt ? bet.completedAt.toISOString() : null
        }
    }

    return reply.code(201).send(response);
}

/**
 * @async
 * @function completeBet
 * @description Complete a bet by setting the winner(s) and completed at fields.
 * @author J. Trpka
 * @param {FastifyRequest} request 
 * @param {FastifyReply} reply 
 */
export const completeBet = async (request: CompleteBetRequest, reply: FastifyReply) => {
    request.log.info('INFO: Completing a Bet');

    const uuid: string = request.params['id'];

    // Mainly trying to see if the bet exists, otherwise throw a 404
    const checkBetWithUUID: QueryResult<BetCompleteCheckQueryResult> = 
        await request.server.dbClient.query(
            `SELECT 
                completed_at AS "completedAt"
            FROM bets WHERE id = $1`,
            [uuid]
        );
    
    // Did the result not return any rows?
    if(checkBetWithUUID.rowCount === 0) {
        // The default 404 error message is not suitable for not finding a bet
        return reply.send({
            error: true,
            message: `Bet not found`,
            data: null
        }).code(404);
    }

    // Could it return too many bets?
    if(checkBetWithUUID.rowCount > 1) {
        return reply.send({
            error: true,
            message: 'Found too many bets of the same ID',
            data: null
        }).code(500);
    }

    // Was the bet already completed?
    if(checkBetWithUUID.rows[0].completedAt) {
        return reply.send({
            error: true,
            message: 'Bet was already completed',
            data: null
        }).code(400);
    }

    // At this point; lets complete the bet
    const body: BetCompleteRequestDTO = request.body;

    const updateResult: QueryResult = await request.server.dbClient.query(
        `UPDATE bets SET
            jeremy_won = $1,
            hidemi_won = $2,
            completed_at = $3,
            updated_at = $4
        WHERE id = $5`,
        [
            body.jeremyWon ? 'true' : 'false', 
            body.hidemiWon ? 'true' : 'false', 
            body.completedAt, 
            new Date().toISOString(), 
            uuid
        ]
    );

    if(updateResult.rowCount === 0) {
        throw new Error('Unable to update existing Bet');
    }

    // TODO: Re-retrieve the updated bet for the response

    return reply.send({hello: 'world'});
}