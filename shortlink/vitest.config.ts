import path from "node:path";
import { defineConfig } from "vitest/config";

process.env.DATABASE_USER = "postgres";
process.env.DATABASE_PASSWORD = "postgres";
process.env.DATABASE_PORT = "9999";
process.env.DATABASE_NAME = "postgres";
process.env.DATABASE_HOST = "localhost";

export default defineConfig({
  root: "./",
  test: {
    root: "./tests",
    mockReset: true,
    globals: true,
    restoreMocks: true,
    typecheck: {
      checker: "tsc",
      allowJs: false,
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
