import { FastifyRequest } from "fastify";
import BetCreateRequestDTO from "../bet-create-request";

interface CreateBetRequest extends FastifyRequest {
    body: BetCreateRequestDTO
}

export default CreateBetRequest;