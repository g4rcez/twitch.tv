import { db } from "~/database/db";

export namespace Shortlink {
  export type Shape = {
    id: string;
    createdAt: Date;
    data: { url: string };
  };

  export const create = async (name: string, url: string): Promise<Shape> => {
    const now = new Date();
    const data = { url };
    try {
      await db.query(
        `
            INSERT INTO public.links (id, create_at, data) VALUES ($1, $2, $3)
        `,
        [name, now, JSON.stringify({ url })],
      );
    } catch (e) {
      console.error(e);
    }
    return { id: name, data, createdAt: now };
  };

  export const countBy = async (name: string): Promise<number> => {
    const result = await db.query(`SELECT * FROM links WHERE id = $1`, [name]);
    return result.rowCount;
  };

  export const get = async (name: string): Promise<Shape | null> => {
    const result = await db.query(`SELECT * FROM links WHERE id = $1`, [name]);
    const first = result.rows[0];
    if (first === undefined) {
      return null;
    }
    return {
      id: name,
      createdAt: new Date(first.create_at),
      data: first.data,
    };
  };
}
