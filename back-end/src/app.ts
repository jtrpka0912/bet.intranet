import FastifyServer from './server';
import PostgresClient from './postgres';
import BettingRoutes from './routes/bets';

require('dotenv').config({
    path: '../.env'
});

const dbClient = new PostgresClient(
    process.env.POSTGRES_USER, 
    process.env.POSTGRES_PASSWORD
);

FastifyServer.register(BettingRoutes, {
    prefix: '/v1/bets'
});

/**
 * @async
 * @function start
 * @description Run the fastify instance server
 * @author J. Trpka
 */
const start = async () => {
    try {
        console.info('INFO: Initializing Server');

        await dbClient.connect();

        FastifyServer.addHook('onClose', async () => {
            await dbClient.disconnect();
        });

        console.info('INFO: Initializing Database Table');
        await dbClient.initTable();

        console.info(`INFO: Running Server on Port ${process.env.SERVER_PORT}`);
        FastifyServer.listen({
            port: parseInt(process.env.SERVER_PORT)
        }, (err) => {
            if(err) throw new Error(err.message);
        });
    } catch (err) {
        FastifyServer.log.error(err);
        console.error('ERROR: ', err);

        // Close the instances
        await FastifyServer.close();
        await dbClient.disconnect();
        process.exit(1);
    }
}

start();