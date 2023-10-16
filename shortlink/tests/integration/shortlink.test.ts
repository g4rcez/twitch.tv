import { describe, expect, test } from "vitest";
import { Shortlink } from "~/database/shortlink";

describe("Should test integration with database", () => {
  test("should create the shortlink object", async () => {
    const input = {
      name: Math.random().toString(36).substring(1, 16),
      url: "https://google.com",
    };
    const insert = await Shortlink.create(input.name, input.url);
    expect(insert).not.toBe(null);
    const select = await Shortlink.get(input.name);
    expect(select).not.toBe(null);
    expect(select!.id).toStrictEqual(input.name);
    expect(select!.data.url).toStrictEqual(input.url);
  });

  test("🚨 should create duplicate name", async () => {
    const input = {
      name: Math.random().toString(36).substring(1, 16),
      url: "https://google.com",
    };
    await Shortlink.create(input.name, input.url);
    try {
      await Shortlink.create(input.name, input.url);
    } catch (e: any) {
      console.log(e);
      // código de duplicação de linha
      expect(e.code).toBe(23505);
    }
    const rows = await Shortlink.countBy(input.name);
    expect(rows).toBe(1);
  });
});
