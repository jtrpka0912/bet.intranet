import fastify, { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import cors from '@fastify/cors';
import postgresClientPlugin from './plugins/postgres-client';
import BettingRoutes from './routes/bets';
import ResponseDTO from "./models/dtos/response";

const server: FastifyInstance = fastify({
    logger: true
});

server.register(postgresClientPlugin);

server.register(cors, {
    origin: process.env.FRONTEND_HOST,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
});

server.register(BettingRoutes, {
    prefix: '/api/v1/bets'
});

server.addHook('onClose', async (instance: FastifyInstance) => {
    instance.log.info('INFO: Disconnecting Database');
    await instance.dbClient.disconnect();
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