import { FastifyInstance, FastifyRequest } from "fastify"
import { retrieveBets, createBet } from "../controllers/bets";

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
}

export default routes;