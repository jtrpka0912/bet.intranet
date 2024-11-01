import { FastifyInstance } from "fastify";
import PostgresClient from "../postgres";
import fastifyPlugin from "fastify-plugin";

/**
 * @function postgresClientPlugin
 * @description Attach the PostgresClient to Fastify
 * @author J. Trpka
 * @param {FastifyInstance} instance 
 */
async function postgresClientPlugin(instance: FastifyInstance) {
    console.info('INFO: Attaching Database to Server');
    const dbClient: PostgresClient = new PostgresClient();
    instance.decorate('dbClient', dbClient);

    instance.addHook('onClose', async () => {
        await dbClient.disconnect();
    });

    instance.addHook('onReady', async () => {
        await dbClient.initTable();
    });
};

export default fastifyPlugin(postgresClientPlugin);