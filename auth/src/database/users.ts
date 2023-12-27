import { Database } from "./connection";
import { Either } from "../lib/either";
import { Override, SnakeObjectToCamelCase } from "../lib/types";

export namespace Users {
    type DbUser = {
        id: string;
        name: string;
        email: string;
        password: string;
        created_at: string;
    };

    export type Type = Omit<Override<SnakeObjectToCamelCase<DbUser>, { createdAt: Date }>, "password">;

    export const getByCredentials = async (email: string, password: string): Promise<Either<Error, Type>> => {
        try {
            const user = await Database.sql<DbUser>`SELECT *
                                                    FROM users
                                                    WHERE email = ${email}
                                                      AND PASSWORD = ${password}`;
            const first = user.rows[0];
            if (!first) return Either.error(new Error("Auth error"));
            return Either.success({
                id: first.id,
                email: first.email,
                name: first.name,
                createdAt: new Date(first.created_at),
            } satisfies Type);
        } catch (e) {
            return Either.error(e as Error);
        }
    };
}
