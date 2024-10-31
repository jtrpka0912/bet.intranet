import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { ResponseDTO } from "../models/dtos/response";

/**
 * @function routes
 * @description All of the bet endpoint routes
 * @author J. Trpka
 * @param {FastifyInstance} fastify
 */
const routes = async (fastify: FastifyInstance) => {
    fastify.post('/', async(request: FastifyRequest): Promise<ResponseDTO<string>> => {
        console.info(request.body);

        return {
            error: false,
            message: null,
            data: 'Hello World'
        }
    });
}

export default routes;