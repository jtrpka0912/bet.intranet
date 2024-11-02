import { FastifyRequest } from "fastify";
import BetCompleteRequestDTO from "../bet-complete-request";

interface CompleteBetRequest extends FastifyRequest {
    body: BetCompleteRequestDTO
}

export default CompleteBetRequest;