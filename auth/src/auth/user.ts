import { FastifyRequest } from "fastify";
import { Jwt } from "./jwt";
import { Secrets } from "../database/secrets";

function getCookie(cookie: string, name: string) {
    let value = RegExp(name + "=[^;]+").exec(cookie);
    return decodeURIComponent(!!value ? value.toString().replace(/^[^=]+./, "") : "");
}

export namespace User {
    export const get = async (req: FastifyRequest) => {
        const authorization = getCookie(req.headers.cookie ?? "", "Authorization");
        const secret = await Secrets.get();
        if (secret.isSuccess()) {
            const jwt = await Jwt.validate(authorization, secret.success);
            return jwt;
        }
        return { authorization: false };
    };
}
