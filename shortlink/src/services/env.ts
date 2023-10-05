export namespace Env {
    export const database = process.env.DATABASE_NAME!;
    export const host = process.env.DATABASE_HOST!
    export const port = Number(process.env.DATABASE_PORT!)
    export const user = process.env.DATABASE_USER!
    export const password = process.env.DATABASE_PASSWORD!
}