import { describe, expect, test } from "vitest";
import { nameRegex } from "~/services/validation";

describe("Should validate shortlink name schema", () => {
  test("✅ should test name regex for success case", () => {
    expect(nameRegex.test("url-legal")).toBe(true);
    expect(nameRegex.test("promoção")).toBe(true);
    expect(nameRegex.test("descontão-123")).toBe(true);
  });

  test("🚨 should test name regex for bad characters", () => {
    expect(nameRegex.test("ú")).toBe(false);
    expect(nameRegex.test("ü")).toBe(false);
  });

  test("🚨 should test name regex for uppercase characters", () => {
    expect(nameRegex.test("Teste")).toBe(false);
    expect(nameRegex.test("TESTE")).toBe(false);
    expect(nameRegex.test("TeStE")).toBe(false);
  });

  test("🚨 should test name regex for special characters", () => {
    expect(nameRegex.test("teste_com_underline")).toBe(false);
    expect(nameRegex.test("teste$")).toBe(false);
    expect(nameRegex.test("teste&")).toBe(false);
  });

  test("🚨 should test name regex for whitespace", () => {
    expect(nameRegex.test("")).toBe(false);
    expect(nameRegex.test("   ")).toBe(false);
    expect(nameRegex.test(" \t  ")).toBe(false);
    expect(nameRegex.test(" \t\r  ")).toBe(false);
  });

});
