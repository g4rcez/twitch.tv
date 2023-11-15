import fastify from "fastify";
import { Env } from "./env";
import { Database } from "./database/connection";
import { Login } from "./auth/login";
import { User } from "./auth/user";

async function bootstrap() {
    Env.init();
    await Database.startup();
    const http = fastify({ logger: false });
    http.post("/login", Login.auth);
    http.get("/test", User.get);
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
