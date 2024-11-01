import PostgresClient from "../postgres";

declare module 'fastify' {
    interface FastifyInstance {
        dbClient: PostgresClient
    }

    interface FastifyRequest {
        dbClient: PostgresClient
    }
}