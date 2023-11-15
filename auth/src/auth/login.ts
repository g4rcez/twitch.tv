import { FastifyRequest, FastifyReply } from "fastify";
import { Secrets } from "../database/secrets";
import { z } from "zod";
import { Jwt } from "./jwt";
import { Strings } from "../lib/strings";

export namespace Login {
    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });

    const user = {
        name: "Fulano",
        email: "fulano@ciclano.com",
        password: "#Senha123",
    };

    const createJwt = async (secret: Secrets.Type, jwtUser: { email: string; name: string }) => {
        return Jwt.create(secret, {
            email: jwtUser.email,
            name: jwtUser.name,
            id: Strings.uuid(),
        });
    };

    export const auth = async (req: FastifyRequest, res: FastifyReply) => {
        const body = req.body;
        const validate = loginSchema.safeParse(body);
        if (validate.success) {
            const data = validate.data;
            if (data.email === user.email && data.password === user.password) {
                const secret = await Secrets.get();
                if (secret.isSuccess()) {
                    const token = await createJwt(secret.success, user);
                    res.headers({
                        "Set-Cookie": `Authorization=${token}`,
                    });
                    return { jwt: token };
                }
            }
        }
        res.status(401);
        return { hack: "the planet" };
    };
}
