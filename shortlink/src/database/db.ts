import { Pool } from "pg";
import { Env } from "~/services/env";

console.log(Env);
export const db = new Pool({
  database: Env.database,
  host: Env.host,
  port: Env.port,
  user: Env.user,
  password: Env.password,
});
