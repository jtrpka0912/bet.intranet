import { QueryResult } from "pg";
import { FastifyReply, FastifyRequest } from "fastify";
import { Validate, Validator } from "../validation";

import BetCreateRequestDTO from "../models/dtos/bet-create-request";
import CreateBetRequest from "../models/dtos/fastify-requests/create-bet-request";
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

    return reply.send(response);
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

    const betEndsAt: Date = new Date(requestBody.betEndsAt);

    // Validate the data
    const validator: Validator = new Validator()
        .required(new Validate('Stipulation', requestBody.stipulation))
        .required(new Validate('Jeremy\'s Answer', requestBody.jeremyAnswer))
        .required(new Validate('Hidemi\'s Answer', requestBody.hidemiAnswer))
        .required(new Validate('Jeremy Bets', requestBody.jeremyBets))
        .required(new Validate('Hidemi Bets', requestBody.hidemiBets))
        .required(new Validate('Bet Ends At', betEndsAt.toISOString()))
        .greaterThan(
            new Validate('Bet Ends At', betEndsAt.getTime()), 
            new Date().getTime(),
            new Date().toLocaleString()
        );

    if(validator.hasErrors()) {
        return reply
            .code(400)    
            .send({
                error: true,
                message: validator.error,
                data: null
            });
    }

    // At this point, create the new bet

    const uuid: string = crypto.randomUUID();
    const result: QueryResult = await request.server.dbClient.query(
        `
            INSERT INTO bets (
                id,
                stipulation,
                jeremy_answer,
                hidemi_answer,
                jeremy_bets,
                hidemi_bets,
                jeremy_won,
                hidemi_won,
                bet_ends_at,
                completed_at,
                created_at,
                updated_at
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
            )
        `, 
        [
            uuid, // 1 - id
            requestBody.stipulation, // 2 - stipulation
            requestBody.jeremyAnswer, // 3 - jeremy_answer
            requestBody.hidemiAnswer, // 4 - hidemi_answer
            requestBody.jeremyBets, // 5 - jeremy_bets
            requestBody.hidemiBets, // 6 - hidemi_bets
            'false', // 7 - jeremy_won
            'false', // 8 - hidemi_won
            requestBody.betEndsAt, // 9 - bet_ends_at
            null, // 10 - completed_at
            new Date().toISOString(), // created_at - 11
            new Date().toISOString() // updated_at - 12
        ]
    );

    if(!result.rowCount) {
        throw new Error('Unable to create new Bet record');
    }

    const response: ResponseDTO<BetResponseDTO> = {
        error: false,
        message: null,
        data: {
            id: uuid,
            stipulation: requestBody.stipulation,
            jeremyAnswer: requestBody.jeremyAnswer,
            hidemiAnswer: requestBody.hidemiAnswer,
            jeremyBets: requestBody.jeremyBets,
            hidemiBets: requestBody.hidemiBets,
            jeremyWon: false,
            hidemiWon: false,
            betEndsAt: requestBody.betEndsAt,
            completedAt: null
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
        return reply.code(404).send({
            error: true,
            message: `Bet not found`,
            data: null
        });
    }

    // Could it return too many bets?
    if(checkBetWithUUID.rowCount > 1) {
        return reply.code(500).send({
            error: true,
            message: 'Found too many bets of the same ID',
            data: null
        });
    }

    // Was the bet already completed?
    if(checkBetWithUUID.rows[0].completedAt) {
        return reply.code(400).send({
            error: true,
            message: 'Bet was already completed',
            data: null
        });
    }

    // At this point; lets complete the bet
    const body: BetCompleteRequestDTO = request.body;

    const validator: Validator = new Validator()
        .required(new Validate('Jeremy Won', body.jeremyWon))
        .required(new Validate('Hidemi Won', body.hidemiWon));

    if(validator.hasErrors()) {
        return reply.code(400).send({
            error: true,
            message: validator.error,
            data: null
        });
    }

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
            new Date().toISOString(), 
            new Date().toISOString(),
            uuid
        ]
    );

    if(updateResult.rowCount === 0) {
        throw new Error('Unable to update existing Bet');
    }

    const updatedResult: QueryResult<BetResponseDTO> = await request.server.dbClient.query(
        `
            SELECT
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
            WHERE id = $1
        `,
        [uuid]
    );

    if(updatedResult.rowCount === 0) {
        throw new Error('Unable to find completed bet');
    }

    if(updatedResult.rowCount > 1) {
        throw new Error('May have updated more than one bet');
    }

    const response: ResponseDTO<BetResponseDTO> = {
        error: false,
        message: null,
        data: updatedResult.rows[0]
    };

    return reply.send(response);
}