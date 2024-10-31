import { FastifyRequest } from "fastify";
import BetCreateRequestDTO from "./dtos/bet-create-request";

interface CreateBetRequest extends FastifyRequest {
    body: BetCreateRequestDTO
}

export default CreateBetRequest;