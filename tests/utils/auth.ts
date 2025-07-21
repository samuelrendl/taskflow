import { Page } from "@playwright/test";

export async function loginTestUser(page: Page) {
  const res = await page.request.get("http://localhost:3000/api/test-login");
  const text = await res.text();

  console.log("Test login response:", text);

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Could not parse /api/test-login response: ${text}`);
  }

  if (!data.sessionToken) {
    throw new Error("No sessionToken returned from /api/test-login");
  }

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
