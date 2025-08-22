import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import InitialDialog from "./InitialDialog";
import CreateDialog from "./CreateDialog";
import JoinDialog from "./JoinDialog";
import FinalDialog from "./FinalDialog";
import { useMe } from "@/hooks/useMe";
import { Organization } from "@/lib/types";

type DialogStep = "initial" | "create" | "join" | "final";

const OrgDialog = ({ userHasOrg }: { userHasOrg: boolean }) => {
  const [step, setStep] = useState<DialogStep>("initial");
  const [stepData, setStepData] = useState<Organization | null>(null);
  const [open, setOpen] = useState(false);

  const me = useMe();

  useEffect(() => {
    if (!userHasOrg) {
      setOpen(true);
    }
  }, [userHasOrg]);

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setStep("initial");
      setStepData(null);
    }
  };

  const handleSetStep = (newStep: DialogStep, data?: Organization | null) => {
    setStep(newStep);
    setStepData(data ?? null);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Create or Join an Org</Button>
      </DialogTrigger>
      <DialogContent>
        {step === "initial" && <InitialDialog setStep={handleSetStep} />}
        {step === "create" && (
          <CreateDialog setStep={handleSetStep} ownerId={me.me!.id} />
        )}
        {step === "join" && <JoinDialog setStep={handleSetStep} />}
        {step === "final" && <FinalDialog organizationData={stepData || undefined} />}
      </DialogContent>
    </Dialog>
  );
};

export default OrgDialog;
