import { Validate, Validator } from "../validation";
import BetCreateRequestDTO from "./dtos/bet-create-request";
import BetResponseDTO from "./dtos/bet-response";
import GeneratedQuery from "./generated-query";

/**
 * @class
 * @name Bet
 */
class Bet {
    private _id?: string;
    private _stipulation: string;
    private _jeremy: Better;
    private _hidemi: Better;
    private _betEndsAt: Date;
    private _completedAt?: Date;

    /**
     * @private
     * @constructor
     * @description The generic constructor derived from other factory methods
     * @author J. Trpka
     * @param {string} stipulation 
     * @param {Better} jeremy 
     * @param {Better} hidemi 
     * @param {string | null} id 
     * @param {Date} betEndsAt 
     * @param {Date?} completedAt 
     */
    private constructor(
        stipulation: string, 
        jeremy: Better, 
        hidemi: Better,
        betEndsAt: Date,
        id?: string,
        completedAt?: Date
    ) {
        this._id = id;
        this._stipulation = stipulation;
        this._jeremy = jeremy;
        this._hidemi = hidemi;
        this._betEndsAt = betEndsAt;
        this._completedAt = completedAt;
    }

    get id(): string {
        return this._id;
    }

    get stipulation(): string {
        return this._stipulation;
    }

    get jeremy(): Better {
        return this._jeremy;
    }

    get hidemi(): Better {
        return this._hidemi;
    }

    get betEndsAt(): Date {
        return this._betEndsAt;
    }

    get completedAt(): Date {
        return this._completedAt;
    }

    /**
     * @public
     * @static
     * @function fromRequest
     * @description Create a Bet object from the request dto
     * @author J. Trpka
     * @param {BetCreateRequestDTO} request 
     * @param {string?} id
     * @returns {Bet}
     */
    public static fromRequest(request: BetCreateRequestDTO, id?: string): Bet {
        const jeremy: Better = new Better(
            request.jeremyAnswer,
            request.jeremyBets,
            request.jeremyWon
        );

        const hidemi: Better = new Better(
            request.hidemiAnswer,
            request.hidemiBets,
            request.hidemiWon
        );
        
        return new Bet(
            request.stipulation,
            jeremy,
            hidemi,
            new Date(request.betEndsAt),
            id,
            request.completedAt ? new Date(request.completedAt) : null
        );
    }

    /**
     * @function canModify
     * @description Check if the Bet can be modified by checking if it has an ID
     * @author J. Trpka
     * @returns {boolean}
     */
    canModify = (): boolean => {
        return !!this._id;
    }

    /**
     * @function didCompleted
     * @description Check if the bet has completed
     * @author J. Trpka
     * @returns {boolean}
     */
    didCompleted = (): boolean => {
        return !!this._completedAt;
    }

    /**
     * @function validate
     * @description Validate the bet if it can be inserted or updated to the database
     * @author J. Trpka
     * @returns {Validator}
     */
    validate = (): Validator => {
        return new Validator()
            .required(new Validate('Stipulation', this._stipulation))
            .required(new Validate('Jeremy\'s Answer', this._jeremy.answer))
            .required(new Validate('Hidemi\'s Answer', this._hidemi.answer))
            .required(new Validate('Jeremy Bets', this._jeremy.bets))
            .required(new Validate('Hidemi Bets', this._hidemi.bets))
            .required(new Validate('Jeremy Did Won', this._jeremy.didWon))
            .required(new Validate('Hidemi Did Won', this._hidemi.didWon))
            .required(new Validate('Bet Ends At', this._betEndsAt.toISOString()))
            .greaterThan(
                new Validate('Bet Ends At', this._betEndsAt.getTime()), 
                new Date().getTime(),
                new Date().toLocaleString()
            );
    }

    /**
     * @function generateQuery
     * @description Generate the data needed for a write SQL query
     * @author J. Trpka
     * @returns {GeneratedQuery}
     */
    generateQuery = (): GeneratedQuery => {
        if(this.canModify()) {
            return this.updateQuery();
        } else {
            return this.insertQuery();
        }
    }

    /**
     * @private
     * @function insertQuery
     * @description Generate the data for an Insert SQL query
     * @author J. Trpka
     * @returns {GeneratedQuery}
     */
    private insertQuery = (): GeneratedQuery => {
        // Initialize the ID for the Bet for the class and row
        const uuid: string = crypto.randomUUID();
        this._id = uuid;

        return {
            query: `
                INSERT INTO bets (
                    id,
                    stipulation,
                    jeremy_answer,
                    hidemi_answer,
                    jeremy_bets,
                    hidemi_bets,
                    jeremy_won,
                    hidemi_won,
                    bet_ends_at,
                    completed_at,
                    created_at,
                    updated_at
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
                )
            `,
            values: [
                uuid, // 1
                this._stipulation, // 2
                this._jeremy.answer, // 3
                this._hidemi.answer, // 4
                this._jeremy.bets, // 5
                this._hidemi.bets, // 6
                this._jeremy.didWon ? 'true' : 'false', // 7
                this._hidemi.didWon ? 'true' : 'false', // 8
                this._betEndsAt.toISOString(), // 9
                this._completedAt ? this._completedAt.toISOString() : null, // 10
                new Date().toISOString(), // created_at - 11
                new Date().toISOString() // updated_at - 12
            ]
        };
    }

    /**
     * @private
     * @function updateQuery
     * @description Generate the data for an Update SQL query
     * @author J. Trpka
     * @returns {GeneratedQuery}
     */
    private updateQuery = (): GeneratedQuery => {
        return {
            query: `
                UPDATE bets SET
                    stipulation = $1,
                    jeremy_answer = $2,
                    hidemi_answer = $3,
                    jeremy_bets = $4,
                    hidemi_bets = $5,
                    jeremy_won = $6,
                    hidemi_won = $7,
                    bet_ends_at = $8,
                    completed_at = $9,
                    updated_at = $10,
                WHERE id = $11
            `,
            values: [
                this._stipulation,
                this._jeremy.answer,
                this._hidemi.answer,
                this._jeremy.bets,
                this._hidemi.bets,
                this._jeremy.didWon ? 'true' : 'false',
                this._hidemi.didWon ? 'true' : 'false',
                this._betEndsAt.toISOString(),
                this._completedAt.toISOString(),
                new Date().toISOString(), // updated_at
                this._id // Where ID = ?
            ]
        }
    }
}

class Better {
    private _answer: string;
    private _bets: string;
    private _didWon: boolean;

    /**
     * @constructor
     * @description A simple constructor for a Better
     * @author J. Trpka
     * @param {string} answer 
     * @param {string} bets 
     * @param {boolean} didWon 
     */
    constructor(answer: string, bets: string, didWon?: boolean) {
        this._answer = answer;
        this._bets = bets;
        this._didWon = didWon;
    }

    get answer(): string {
        return this._answer;
    }

    get bets(): string {
        return this._bets;
    }

    get didWon(): boolean {
        return this._didWon;
    }
}

export default Bet;