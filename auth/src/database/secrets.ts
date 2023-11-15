import { Database } from "./connection";
import { Either } from "../lib/either";

export namespace Secrets {
    type DbType = {
        id: string;
        created_at: string;
        deleted_at: string | null;
        secret: string;
    };

    export type Type = {
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        secret: string;
    };

    export const get = async (): Promise<Either<Error, Type>> => {
        try {
            const result = await Database.sql<DbType>`SELECT *
                                                      FROM secrets
                                                      WHERE deleted_at IS null
                                                      LIMIT 1`;
            const row = result.rows[0];
            return row
                ? Either.success({
                      id: row.id,
                      secret: row.secret,
                      createdAt: new Date(row.created_at),
                      deletedAt: row.deleted_at ? new Date(row.deleted_at) : null,
                  })
                : Either.error(new Error("Cannot find secret"));
        } catch (e) {
            return Either.error(new Error("Error on find secret"));
        }
    };
}
