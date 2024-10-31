import FastifyServer, { postgresClientPlugin } from './server';
import BettingRoutes from './routes/bets';

FastifyServer.register(postgresClientPlugin);

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
        if(!FastifyServer.dbClient) throw new Error('Database client not attached to server');

        await FastifyServer.dbClient.connect();

        FastifyServer.addHook('onClose', async () => {
            await FastifyServer.dbClient.disconnect();
        });

        console.info('INFO: Initializing Database Table');
        await FastifyServer.dbClient.initTable();

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
        await FastifyServer.dbClient.disconnect();
        process.exit(1);
    }
}

start();