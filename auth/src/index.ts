import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { Env } from "./env";
import { Database } from "./database/connection";
import { Login } from "./auth/login";
import { User } from "./auth/user";
import { Jwt } from "./auth/jwt";
import { Secrets } from "./database/secrets";
import { JwtPayload } from "jsonwebtoken";

type Next = () => void;

const authorizationMiddleware = (roles: string[]) => async (req: FastifyRequest, res: FastifyReply, next: Next) => {
    const jwt = req.headers.authorization || "";
    const secret = await Secrets.get();
    if (secret.isError()) {
        return { error: ["Secret error"] };
    }
    const jwtValidated = Jwt.validate(jwt, secret.success);
    const payload = jwtValidated.payload as JwtPayload;
    const userRoles: string[] = payload["roles"];
    const hasProfile = roles.some((role) => userRoles.includes(role));
    return hasProfile ? next() : res.status(403).send({ error: "You shall not pass" });
};

async function bootstrap() {
    Env.init();
    await Database.startup();
    const http = fastify({
        logger: false,
        ajv: {
            customOptions: {
                strict: true,
                allErrors: true,
                coerceTypes: false,
            },
            plugins: [require("ajv-errors")],
        },
    });
    await http.register(require("@fastify/express"));
    http.post("/login", ...Login.auth);
    http.get(
        "/users",
        {
            preHandler: authorizationMiddleware(["admin.user"]),
        },
        User.get,
    );
    try {
        await http.listen({ port: 5000 });
        console.log("🚀 :5000");
        return { server: http.server, error: null };
    } catch (error) {
        console.error(error);
        return { server: http.server, error };
    }
}

bootstrap().then((result) => {
    const server = result.server;
    const close = async (e: any) => {
        server.close(e);
        await Database.shutdown();
        process.exit(127);
    };
    process.on("uncaughtException", close);
    process.on("uncaughtException", close);
});
