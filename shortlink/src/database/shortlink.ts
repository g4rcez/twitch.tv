import {db} from "~/database/db";

export namespace Shortlink {

    export type Shape = {
        id: string;
        createdAt: Date;
        data: { url: string }
    }

    export const create = async (name: string, url: string): Promise<Shape> => {
        const now = new Date()
        const data = {url}
        await db.query(`
            INSERT INTO public.links (id, create_at, data) VALUES ($1, $2, $3)
        `, [name, now, JSON.stringify({url})])
        return {id: name, data, createdAt: now}
    }

    export const get = async (name: string): Promise<Shape | null> => {
        const result = await db.query(`
            SELECT * FROM links WHERE id = $1
        `, [name]);
        const first = result.rows[0]
        if (first === undefined) {
            return null;
        }
        return {
            id: name,
            createdAt: new Date(first.create_at),
            data: first.data
        }
    }
}
