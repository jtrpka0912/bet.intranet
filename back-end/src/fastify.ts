import fastify, { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import postgresClientPlugin from './plugins/postgres-client';
import BettingRoutes from './routes/bets';
import ResponseDTO from "./models/dtos/response";

const server: FastifyInstance = fastify();

server.register(postgresClientPlugin);

server.register(BettingRoutes, {
    prefix: '/v1/bets'
});

server.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    const errorResponse: ResponseDTO<string> = {
        error: true,
        message: error.message,
        data: null
    };

    reply
        .status(error.statusCode || 500)
        .send(errorResponse)
});

server.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    const errorResponse: ResponseDTO<string> = {
        error: true,
        message: `Route (${request.method}) ${request.url} not found`,
        data: null
    };

    reply
        .status(404)
        .send(errorResponse)
});

export default server;