import fastify, { FastifyInstance } from 'fastify';
import BettingRoutes from './routes/bets';
import postgresClientPlugin from './plugins/postgres-client';

const server: FastifyInstance = fastify();

server.register(postgresClientPlugin);

server.register(BettingRoutes, {
    prefix: '/v1/bets'
});

/**
 * @async
 * @function start
 * @description Run the fastify instance server
 * @author J. Trpka
 */
const start = async () => {
    console.info('INFO: Initializing Server');

    try {
        console.info(`INFO: Running Server on Port ${process.env.SERVER_PORT}`);
        server.listen({
            port: parseInt(process.env.SERVER_PORT)
        }, (err) => {
            if(err) throw new Error(err.message);
        });
    } catch (err) {
        server.log.error(err);
        console.error('ERROR: ', err);

        // Close the instances
        await server.close();
        process.exit(1);
    }
}

start();