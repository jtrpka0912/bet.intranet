import { FastifyRequest } from "fastify";
import BetCompleteRequestDTO from "./dtos/bet-complete-request";

interface CompleteBetRequest extends FastifyRequest {
    body: BetCompleteRequestDTO
}

export default CompleteBetRequest;