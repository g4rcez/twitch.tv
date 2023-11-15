import { Pool } from "pg";
import { Env } from "../env";
import { Strings } from "../lib/strings";

export namespace Database {
    const db = new Pool({ connectionString: Env.database });

    const isTemplateStringsArray = (strings: unknown): strings is TemplateStringsArray =>
        Array.isArray(strings) && "raw" in strings && Array.isArray(strings.raw);

    export const replaceUnsafe = (query: string, ...values: any) => {
        let result = query;
        for (let i = 0; i < values.length; i++) result = query.replace(`$${i}`, values);
        return Strings.trim(result);
    };

    export const sql = async <T extends object = any>(query: TemplateStringsArray, ...values: any[]) => {
        if (!isTemplateStringsArray(query) || !Array.isArray(values)) {
            throw new Error("Call using template literals");
        }
        let preparedQuery = "";
        for (let i = 0; i < values.length; i++) {
            const literal = query[i];
            preparedQuery += `${literal}$${i + 1}`;
        }
        preparedQuery += Strings.trim(query[query.length - 1] as string);
        const result = await db.query(preparedQuery, values);
        return {
            rows: result.rows as T[],
            command: result.command,
            length: result.rowCount ?? 0,
            query: Env.isLocal ? replaceUnsafe(preparedQuery, values) : preparedQuery,
        };
    };

    export const startup = async () =>
        await sql`SELECT id, secret, created_at, deleted_at
                                                 FROM secrets`;

    export const shutdown = () => db.end();
}
