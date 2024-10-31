import { BetCreateRequestDTO } from "./dtos/bet-create-request";
import { BetResponseDTO } from "./dtos/bet-response";
import { GeneratedQuery } from "./generated-query";

export class Bet {
    private _id?: string;
    private _stipulation: string;
    private _jeremy: Better;
    private _hidemi: Better;
    private _betEndsAt?: Date;
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
     * @param {Date | null} betEndsAt 
     * @param {Date | null} completedAt 
     */
    private constructor(
        stipulation: string, 
        jeremy: Better, 
        hidemi: Better,
        id?: string,
        betEndsAt?: Date,
        completedAt?: Date
    ) {
        this._id = id;
        this._stipulation = stipulation;
        this._jeremy = jeremy;
        this._hidemi = hidemi;
        this._betEndsAt = betEndsAt;
        this._completedAt = completedAt;
    }

    /**
     * @public
     * @static
     * @function fromRequest
     * @description Create a Bet object from the request dto
     * @author J. Trpka
     * @param {BetCreateRequestDTO} request 
     * @returns {Bet}
     */
    public static fromRequest(request: BetCreateRequestDTO): Bet {
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
            null,
            new Date(request.betEndsAt),
            new Date(request.completedAt)
        );
    }

    /**
     * @public
     * @static
     * @function fromResponse
     * @description Create a Bet object from the response dto
     * @author J. Trpka
     * @param {BetResponseDTO} response
     * @returns {Bet}
     */
    public static fromResponse(response: BetResponseDTO): Bet {
        const jeremy: Better = new Better(
            response.jeremyAnswer,
            response.jeremyBets,
            response.jeremyWon
        );

        const hidemi: Better = new Better(
            response.hidemiAnswer,
            response.hidemiBets,
            response.hidemiWon
        );
        
        return new Bet(
            response.stipulation,
            jeremy,
            hidemi,
            response.id,
            new Date(response.betEndsAt),
            new Date(response.completedAt)
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
        const uuid = crypto.randomUUID();
        this._id = uuid.toString();

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
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
                )
            `,
            values: [
                uuid,
                this._stipulation,
                this._jeremy.answer,
                this._hidemi.answer,
                this._jeremy.bets,
                this._hidemi.bets,
                this._jeremy.didWon ? 'true' : 'false',
                this._hidemi.didWon ? 'true' : 'false',
                this._betEndsAt.toISOString(),
                this._completedAt.toISOString(),
                new Date().toISOString(),
                new Date().toISOString()
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
                new Date().toISOString(),
                this._id
            ]
        }
    }
}

class Better {
    private _answer: string;
    private _bets: string;
    private _didWon?: boolean;

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