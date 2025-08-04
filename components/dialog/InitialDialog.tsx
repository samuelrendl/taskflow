import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { setTypeProps } from "@/lib/types";

const InitialDialog = ({ setStep }: setTypeProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Do you want to Create or Join an Organization?
        </DialogTitle>
        <DialogDescription>
          Choose how you’d like to get started.
        </DialogDescription>
      </DialogHeader>
      <div>
        <Button variant="outline" onClick={() => setStep("create")}>
          Create Organization
        </Button>
        <Button variant="outline" onClick={() => setStep("join")}>
          Join Organization
        </Button>
      </div>
    </>
  );
};

export default InitialDialog;
