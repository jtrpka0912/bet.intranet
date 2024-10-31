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

    initTable = async () => {
        await this.query(`
        -- Create the Bets table
        CREATE TABLE IF NOT EXISTS ${this._tableName} (
            id UUID PRIMARY KEY NOT NULL,
            stipulation TEXT NOT NULL, -- What are we betting to happen
            jeremy_answer TEXT NOT NULL, -- What is Jeremy answer that will win the bet
            hidemi_answer TEXT NOT NULL, -- What is Hidemi answer that will win the bet
            jeremy_bets TEXT NOT NULL, -- What is Jeremy's prize when winning bet
            hidemi_bets TEXT NOT NULL, -- What is Hidemi's prize when winning bet
            jeremy_won BOOLEAN NULL, -- Did Jeremy won bet, null is undecided
            hidemi_won BOOLEAN NULL, -- Did Hidemi won bet, null is undecided
            bet_ends_at TIMESTAMP WITH TIME ZONE NULL, -- The bet will end at a specific date
            completed_at TIMESTAMP WITH TIME ZONE NULL, -- The bet finished on a specific data
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(), -- This row was created at a specific date
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() -- This row was updated at a specific date
        )`);
    }

    /**
     * @function query
     * @description Run a query with the query string and (if any) values
     * @author J. Trpka
     * @param {string} query 
     * @param {string[] | null} values 
     * @returns {Promise<QueryResult>}
     */
    query = async (query: string, values?: string[]): Promise<QueryResult> => {
        return this._client.query(query, values);
    }
}

export default PostgresClient;