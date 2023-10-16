import { z } from "zod";

export const urlSchema = z.string().url();

export const nameRegex = /^[a-z][a-z0-9à-ú-]+$/;

export const nameSchema = z
  .string()
  .regex(nameRegex, "Padrão de nome é [a-z0-9] e traço (-)");

export const schema = z.object({ url: urlSchema, name: nameSchema });

export type Schema = z.infer<typeof schema>;
