import {Client, QueryResult} from 'pg';

/**
 * @class
 * @name PostgresClient
 * @description A facade wrapper for the pg library
 * @author J. Trpka
 */
class PostgresClient {
    private _user: string;
    private _password: string;

    private _schemaName: string = 'bets';
    private _tableName: string = 'bets';

    private _client: Client;

    /**
     * @constructor
     * @description Initialize the Postgres client
     * @author J. Trpka
     * @param {string} user 
     * @param {string} password 
     */
    constructor(user: string, password: string) {
        this._user = user;
        this._password = password;

        this._client = new Client({
            user,
            password
        });
    }

    get client(): Client {
        return this._client;
    }

    /**
     * @public
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
     * @public
     * @async
     * @function disconnect
     * @description Disconnect from the Postgres database
     * @author J. Trpka
     */
    disconnect = async () => {
        console.info('INFO: Disconnecting Database');
        this._client.end();
    }

    /**
     * @private
     * @function query
     * @description Run a query with the query string and (if any) values
     * @author J. Trpka
     * @param {string} query 
     * @param {string[] | null} values 
     * @returns {Promise<QueryResult>}
     */
    private query = async (query: string, values?: string[]): Promise<QueryResult> => {
        return this._client.query(query, values);
    }
}

export default PostgresClient;