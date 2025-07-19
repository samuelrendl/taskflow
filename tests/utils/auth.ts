import { Page } from "@playwright/test";

export async function loginTestUser(page: Page) {
  const res = await page.request.get("http://localhost:3000/api/test-login");
  const data = await res.json();

  await page.context().addCookies([
    {
      name: "authjs.session-token",
      value: data.sessionToken,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    },
  ]);
}
