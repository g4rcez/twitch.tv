import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
    DATABASE: z.string().url(),
    NODE_ENV: z.enum(["development", "production", "test"] as const).default("development"),
});

type EnvVariables = z.infer<typeof envSchema>;

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvVariables {}
    }
}

export namespace Env {
    export const init = () => {
        const validation = envSchema.safeParse(process.env);
        if (validation.success) return validation.data;
        throw new Error("Env");
    };

    export const database = process.env.DATABASE;

    const parsed = envSchema.safeParse(process.env);

    const env = parsed.success ? parsed.data : ({} as EnvVariables);

    export const isLocal = env.NODE_ENV === "development" || env.NODE_ENV === "test";
}
