import FastifyServer from './fastify';

/**
 * @async
 * @function start
 * @description Run the fastify instance server
 * @author J. Trpka
 */
const start = async () => {
    console.info('INFO: Initializing Server');

    try {
        console.info(`INFO: Running Server on Port ${process.env.SERVER_PORT ?? 3000}`);
        FastifyServer.listen({
            port: parseInt(process.env.SERVER_PORT) ?? 3000
        }, (err) => {
            if(err) throw new Error(err.message);
        });
    } catch (err) {
        FastifyServer.log.error(err);
        console.error('ERROR: ', err);

        // Close the instances
        await FastifyServer.close();
        process.exit(1);
    }
}

start();