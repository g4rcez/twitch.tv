import { FastifyRequest } from "fastify";

export namespace User {
    export const get = async (_req: FastifyRequest) => {
        return {
            user: {
                name: "Fulano",
                email: "email@email.io",
            },
        };
    };
}
