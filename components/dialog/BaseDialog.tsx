import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState, ReactNode } from "react";
import { DialogStep, DialogStepHandler, Organization, Team } from "@/lib/types";

interface BaseDialogProps<T = Organization | Team> {
  triggerText: string;
  autoOpen?: boolean;
  children: (props: {
    step: DialogStep;
    setStep: DialogStepHandler<T>;
    stepData: T | null;
  }) => ReactNode;
}

function BaseDialog<T = Organization | Team>({
  triggerText,
  autoOpen = false,
  children,
}: BaseDialogProps<T>) {
  const [step, setStep] = useState<DialogStep>("initial");
  const [stepData, setStepData] = useState<T | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
    }
  }, [autoOpen]);

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setStep("initial");
      setStepData(null);
    }
  };

  const handleSetStep: DialogStepHandler<T> = (newStep, data) => {
    setStep(newStep);
    setStepData(data ?? null);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </DialogTrigger>
      <DialogContent>
        {children({ step, setStep: handleSetStep, stepData })}
      </DialogContent>
    </Dialog>
  );
}

export default BaseDialog;