import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { BaseDialogProps, Organization } from "@/lib/types";

const JoinDialog = ({ setStep }: BaseDialogProps<Organization>) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create an Organization</DialogTitle>
        <DialogDescription>
          Enter name for your new organization.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <Button variant="outline">Organization 1</Button>
        <Button variant="outline">Organization 2</Button>
        <Button variant="outline">Organization 3</Button>
      </div>
      <div>
        <Button variant="outline" onClick={() => setStep("initial")}>
          Back
        </Button>
      </div>
    </>
  );
};

export default JoinDialog;
