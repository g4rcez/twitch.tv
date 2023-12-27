import { Secrets } from "../database/secrets";
import { Jwt } from "./jwt";
import { StatusCode } from "../lib/http";
import { Users } from "../database/users";
import { S } from "fluent-json-schema";
import { createEndpoint } from "../lib/fastify";

export namespace Login {
    type LoginBody = { email: string; password: string; publicKey: string };
    const roles = ["admin.user"];

    const createJwt = async (secret: Secrets.Type, user: Users.Type) =>
        Jwt.create(
            secret,
            {
                email: user.email,
                name: user.name,
                id: user.id,
            },
            roles,
        );

    export const auth = createEndpoint(
        async (req, res) => {
            const data = req.body as LoginBody;
            const user = await Users.getByCredentials(data.email, data.password);
            if (user.isSuccess()) {
                const secret = await Secrets.get();
                if (secret.isSuccess()) {
                    const token = await createJwt(secret.success, user.success);
                    res.headers({ "Set-Cookie": `Authorization=${token};httponly=true` }).status(StatusCode.Created);
                    return { jwt: token };
                }
            }

            res.status(StatusCode.NotAuthorized);
            return { errors: [user.error.message ?? "Unknown"] };
        },
        {
            schema: {
                body: S.object<LoginBody>()
                    .prop("email", S.string().format(S.FORMATS.EMAIL).required())
                    .prop("password", S.string().minLength(8).required())
                    .id("loginSchema")
                    .title("Login Schema")
                    .description("Should validate the credentials for login"),
            },
        },
    );
}
