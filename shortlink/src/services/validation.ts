import {z} from "zod";

export const schema = z.object({
    url: z.string().url(),
    name: z.string().regex(/^[a-z][a-z0-9à-ú-]+$/, "Padrão de nome é [a-z0-9] e traço (-)")
})

export type Schema = z.infer<typeof schema>