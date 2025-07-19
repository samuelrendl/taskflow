// tests/auth-flow.spec.ts
import { test, expect } from "@playwright/test";
import { loginTestUser } from "./utils/auth";

test("should access dashboard when logged in", async ({ page }) => {
  await loginTestUser(page);
  await page.goto("http://localhost:3000/dashboard");
  await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
});

test("should sign out successfully", async ({ page }) => {
  await loginTestUser(page);
  await page.goto("http://localhost:3000/dashboard");
  await page.locator('[id="radix-«Rsrl7»"]').click();
  await page.getByRole("menuitem", { name: "Sign Out" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");
  await expect(
    page.getByRole("button", { name: "Github Icon Continue with" }),
  ).toBeVisible();
});
