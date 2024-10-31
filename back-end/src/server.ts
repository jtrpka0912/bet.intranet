import Fastify, { FastifyInstance } from 'fastify';
import PostgresClient from './postgres';

require('dotenv').config({
    path: '../.env'
});

const server: FastifyInstance = Fastify({});

export const postgresClientPlugin = (instance: FastifyInstance) => {
    console.info('INFO: Attaching Database to Server');
    const dbClient: PostgresClient = new PostgresClient(process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD);

    instance.decorate('dbClient', dbClient);
};

export default server;