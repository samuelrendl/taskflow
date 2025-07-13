import getSession from "@/lib/getSession";
import { SignIn } from "../components/auth/SignInButton";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {user ? (
        <a href="/dashboard">
          <Button variant={"outline"}>Continue</Button>
        </a>
      ) : (
        <>
          <h1>Hello</h1>
          <SignIn />
        </>
      )}
    </main>
  );
}
