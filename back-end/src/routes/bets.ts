import { FastifyInstance, FastifyRequest } from "fastify"
import { retrieveBets, createBet, completeBet } from "../controllers/bets";

/**
 * @async
 * @function routes
 * @description All of the bet endpoint routes
 * @author J. Trpka
 * @param {FastifyInstance} fastify
 */
const routes = async (fastify: FastifyInstance) => {
    fastify.get('/', retrieveBets);
    fastify.post('/', createBet);
    fastify.patch('/:id/complete', completeBet);
}

export default routes;