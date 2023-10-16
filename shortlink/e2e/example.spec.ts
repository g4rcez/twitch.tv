import { expect, test } from "@playwright/test";

test("Fill the inputs", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByTestId("name").fill("e2e");
  await page
    .getByTestId("url")
    .fill("https://playwright.dev/docs/writing-tests");
  await page.getByTestId("submit").click();
  await expect(page.getByRole("link", { name: "e2e" })).toBeVisible();
});
