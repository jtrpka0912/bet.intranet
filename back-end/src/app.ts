import {Client} from 'pg';
import FastifyServer from './server';

const postgresClient: Client = new Client({
    user: 'postgres',
    password: 'password'
});

FastifyServer.get('/', async () => {
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
    console.info('INFO: Initializing Server');
    try {
        console.info('INFO: Connecting to Database');
        await postgresClient.connect();

        console.info('INFO: Running Server on Port 3000');
        await FastifyServer.listen({
            port: 3000
        });

        postgresClient.on('error', (err) => {
            throw new Error(err.message);
        });

        console.info('INFO: Disconnecting Database');
        await postgresClient.end();
    } catch (err) {
        FastifyServer.log.error(err);
        console.error('ERROR: ', err);
        process.exit(1);
    }
}

start();