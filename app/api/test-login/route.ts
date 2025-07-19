import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { serialize } from "cookie";

export async function GET() {
  if (process.env.TEST_MODE !== "test") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const email = "testuser@example.com";

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: "Test User",
      },
    });
  }

  const sessionToken = randomUUID();
  await prisma.session.create({
    data: {
      sessionToken,
      userId: user.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  const cookie = serialize("authjs.session-token", sessionToken, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });

  const response = NextResponse.json({ sessionToken });
  response.headers.set("Set-Cookie", cookie);
  return response;
}
