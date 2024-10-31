import {Client} from 'pg';

/**
 * @function PostgresClient
 * @description Initialize the Postgres client
 * @author J. Trpka
 * @param {string} user 
 * @param {string} password 
 * @returns 
 */
const PostgresClient = (user: string, password: string): Client => {
    const client: Client = new Client({
        user,
        password
    });

    return client;
}

export default PostgresClient;