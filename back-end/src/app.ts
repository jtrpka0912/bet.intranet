import FastifyServer from './fastify';

/**
 * @async
 * @function start
 * @description Run the fastify instance server
 * @author J. Trpka
 */
const start = async () => {
    FastifyServer.log.info('INFO: Initializing Server');

    try {
        FastifyServer.listen({
            port: parseInt(process.env.SERVER_PORT) ?? 3000,
        }, (err) => {
            if(err) throw new Error(err.message);

            FastifyServer.log.info(`INFO: Running Server on Port ${process.env.SERVER_PORT ?? 3000}`);
        });
    } catch (err) {
        FastifyServer.log.error(err);
        FastifyServer.log.error('ERROR: ', err);

        // Close the instances
        await FastifyServer.close();
        process.exit(1);
    }
}

start();