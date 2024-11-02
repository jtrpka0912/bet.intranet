import BetCreateRequestDTO from "../models/dtos/bet-create-request";
import Bet from "../models/bet";
import GeneratedQuery from "../models/generated-query";
import CreateBetRequest from "../models/create-bet-request";
import { QueryResult } from "pg";
import { FastifyReply, FastifyRequest } from "fastify";
import ResponseDTO from "../models/dtos/response";
import BetResponseDTO from "../models/dtos/bet-response";
import BetPaginationResponseDTO from "../models/dtos/bet-pagination-response";

export const retrieveBets = async (request: CreateBetRequest, reply: FastifyReply) => {
    request.log.info('INFO: Retrieving Bets');

    const page: string = request.query['page'] || '0';
    const limit: string = request.query['limit'] || '20';

    // Retrieve the total count of bets
    const countResult: QueryResult = await request.server.dbClient.query(
        `SELECT COUNT(id) AS count FROM bets`
    );

    // Retrieve a paginated set of bets
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
 * @description Complete a bet by setting the winner and completed at fields.
 * @author J. Trpka
 * @param {FastifyRequest} request 
 * @param {FastifyReply} reply 
 */
export const completeBet = async (request: FastifyRequest, reply: FastifyReply) => {
    request.log.info('INFO: Completing a Bet');

    const uuid: string = request.params['id'];

    // We are mainly trying to see if the bet exists, otherwise throw an error
    const retrieveBetFromUUID: QueryResult = 
        await request.server.dbClient.query(
            `SELECT id FROM bets WHERE id = $1`,
            [uuid]
        );
    
    if(retrieveBetFromUUID.rowCount === 0) {
        return reply.send({
            error: true,
            message: `Bet not found`,
            data: null
        }).code(404);
    }

    return reply.send({hello: 'world'});
}