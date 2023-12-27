import { Database } from "./connection";
import { Either } from "../lib/either";

export namespace Secrets {
    type DbType = {
        id: string;
        created_at: string;
        deleted_at: string | null;
        passphrase: string;
    };

    export type Type = {
        id: string;
        createdAt: Date;
        deletedAt: Date | null;
        passphrase: string;
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
                      passphrase: row.passphrase,
                      deletedAt: null,
                      createdAt: new Date(row.created_at),
                  })
                : Either.error(new Error("Cannot find secret"));
        } catch (e) {
            return Either.error(new Error("Error on find secret"));
        }
    };
}
