import { describe, expect, test } from "vitest";
import { schema } from "~/services/validation";

describe("Should validate shortlink json schema", () => {
  test("✅ should test schema for success case", () => {
    expect(
      schema.safeParse({
        url: "https://google.com",
        name: "google",
      }).success,
    ).toBe(true);

    expect(
      schema.safeParse({
        url: "https://google.com",
        name: "promoção-123",
      }).success,
    ).toBe(true);

    expect(
      schema.safeParse({
        url: "https://google.com",
        name: "google-123",
      }).success,
    ).toBe(true);
  });

  test("🚨 should test schema for failed case", () => {
    expect(
      schema.safeParse({
        url: "https:/google.com",
        name: "Google",
      }).success,
    ).toBe(false);
  });
});
