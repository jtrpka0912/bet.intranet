import { BetCreateRequestDTO } from "./dtos/bet-create-request";
import { BetResponseDTO } from "./dtos/bet-response";

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