import Fastify, { FastifyInstance } from 'fastify';

const server: FastifyInstance = Fastify({});

server.get('/', async () => {
    return {
        hello: 'world'
    };
});

/**
 * @async
 * @function start
 * @description Run the fastify instance server
 * @author J. Trpka
 */
const start = async () => {
    try {
        await server.listen({
            port: 3000
        });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();