import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const buttonStyle = "w-full";

export function SignIn() {
  return (
    <div className="flex gap-1">
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <Button type="submit" variant={"outline"} className={buttonStyle}>
          <Image
            src={"/github/github-mark.svg"}
            alt="Github Icon"
            height={20}
            width={20}
          />
          Continue with Github
        </Button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <Button type="submit" variant={"outline"} className={buttonStyle}>
          <Image
            src={"/google/google-icon.svg"}
            alt="Google Icon"
            height={20}
            width={20}
          />
          Continue with Google
        </Button>
      </form>
    </div>
  );
}
