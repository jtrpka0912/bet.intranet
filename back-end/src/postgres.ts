import {Client, Pool, QueryResult} from 'pg';

require('dotenv').config({
    path: '../.env'
});

/**
 * @class
 * @name PostgresClient
 * @description A facade wrapper for the pg library
 * @author J. Trpka
 */
class PostgresClient {
    private _tableName: string = 'bets';

    private _pool: Pool;

    /**
     * @constructor
     * @description Initialize the Postgres client
     * @author J. Trpka
     */
    constructor() {
        this._pool = new Pool({
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD
        })
    }

    /**
     * @public
     * @async
     * @function connect
     * @description Connect to a Postgres database
     * @author J. Trpka
     */
    connect = async () => {
        await this._pool.connect()
    }

    /**
     * @public
     * @async
     * @function disconnect
     * @description Disconnect from the Postgres database
     * @author J. Trpka
     */
    disconnect = async () => {
        await this._pool.end();
    }

    /**
     * @function initTable
     * @description Initially create the necessary tables unless already exists
     * @author J. Trpka
     */
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
        return this._pool.query(query, values);
    }
}

export default PostgresClient;