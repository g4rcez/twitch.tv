import { Secrets } from "../database/secrets";
import { sign, verify } from "jsonwebtoken";

export namespace Jwt {
    type JwtUser = {
        id: string;
        name: string;
        email: string;
    };

    const issuer = "018bd4f4-df84-78fb-b529-4d9ae71be97b";

    export const create = (secret: Secrets.Type, jwtUser: JwtUser, roles: string[]) =>
        sign(
            {
                name: jwtUser.name,
                email: jwtUser.email,
                id: jwtUser.id,
                roles,
            },
            secret.passphrase,
            {
                issuer,
                algorithm: "HS256",
                expiresIn: "1h",
                encoding: "utf-8",
            },
        );

    export const validate = (token: string, secret: Secrets.Type) =>
        verify(token, secret.passphrase, {
            issuer,
            complete: true,
            algorithms: ["HS256"],
            ignoreExpiration: false,
        });
}
