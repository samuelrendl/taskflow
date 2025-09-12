// tests/auth-flow.spec.ts
import { test, expect } from "@playwright/test";
import { loginTestUser } from "./utils/auth";

test("should access dashboard when logged in", async ({ page }) => {
  await loginTestUser(page);
  await page.goto("http://localhost:3000/dashboard");
  await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
});

