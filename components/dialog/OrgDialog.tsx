import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import InitialDialog from "./InitialDialog";
import CreateDialog from "./CreateDialog";
import JoinDialog from "./JoinDialog";

type DialogStep = "initial" | "create" | "join";

const OrgDialog = ({ userHasOrg }: { userHasOrg: boolean }) => {
  const [step, setStep] = useState<DialogStep>("initial");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!userHasOrg) {
      setOpen(true);
    }
  }, [userHasOrg]);

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setStep("initial");
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Create or Join an Org</Button>
      </DialogTrigger>
      <DialogContent>
        {step === "initial" && <InitialDialog setStep={setStep} />}
        {step === "create" && <CreateDialog setStep={setStep} />}
        {step === "join" && <JoinDialog setStep={setStep} />}
      </DialogContent>
    </Dialog>
  );
};

export default OrgDialog;
