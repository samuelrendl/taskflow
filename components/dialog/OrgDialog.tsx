import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import InitialDialog from "./InitialDialog";
import CreateDialog from "./CreateDialog";
import JoinDialog from "./JoinDialog";
import FinalDialog from "./FinalDialog";
import { useMe } from "@/hooks/useMe";

type DialogStep = "initial" | "create" | "join" | "final";

const OrgDialog = ({ userHasOrg }: { userHasOrg: boolean }) => {
  const [step, setStep] = useState<DialogStep>("initial");
  const [open, setOpen] = useState(false);

  const me = useMe();

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
        {step === "create" && (
          <CreateDialog setStep={setStep} ownerId={me.me!.id} />
        )}
        {step === "final" && (
          <FinalDialog
            organizationName={me.me?.organization?.name || "Your Organization"}
          />
        )}
        {step === "join" && <JoinDialog setStep={setStep} />}
      </DialogContent>
    </Dialog>
  );
};

export default OrgDialog;
