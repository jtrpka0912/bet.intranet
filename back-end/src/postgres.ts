import {Client} from 'pg';

/**
 * @class
 * @name PostgresClient
 * @description A facade wrapper for the pg library
 * @author J. Trpka
 */
class PostgresClient {
    private _client: Client;

    /**
     * @constructor
     * @description Initialize the Postgres client
     * @author J. Trpka
     * @param {string} user 
     * @param {string} password 
     */
    constructor(user: string, password: string) {
        this._client = new Client({
            user,
            password
        });
    }

    get client(): Client {
        return this._client;
    }

    /**
     * @async
     * @function connect
     * @description Connect to a Postgres database
     * @author J. Trpka
     */
    connect = async () => {
        console.info('INFO: Connecting to Database');
        this._client.connect()
    }

    /**
     * @async
     * @function disconnect
     * @description Disconnect from the Postgres database
     * @author J. Trpka
     */
    disconnect = async () => {
        console.info('INFO: Disconnecting Database');
        this._client.end();
    }
}

export default PostgresClient;