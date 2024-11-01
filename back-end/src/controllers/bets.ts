import BetCreateRequestDTO from "../models/dtos/bet-create-request";
import Bet from "../models/bet";
import GeneratedQuery from "../models/generated-query";
import CreateBetRequest from "../models/create-bet-request";
import { QueryResult } from "pg";
import { FastifyReply } from "fastify";

export const retrieveBets = async (request: CreateBetRequest, reply: FastifyReply) => {
    console.info('INFO: Retrieving Bets');

    const page: number = parseInt(request.query['page']) || 0;
    const limit: number = parseInt(request.query['limit']) || 20;

    console.info(page, limit);
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
    console.info('INFO: Creating Bet');

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

    reply
        .code(201)
        .send({
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
        });

    if(reply.sent) {
        await request.server.dbClient.disconnect();
    }
}