import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { setTypeProps } from "@/lib/types";
import { Input } from "../ui/input";

const CreateDialog = ({ setStep }: setTypeProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create an Organization</DialogTitle>
        <DialogDescription>
          Enter name for your new organization.
        </DialogDescription>
      </DialogHeader>
      <Input placeholder="Organization name" />
      <div>
        <Button variant="outline" onClick={() => setStep("initial")}>
          Back
        </Button>
        <Button variant="outline" type="submit">Create</Button>
      </div>
    </>
  );
};

export default CreateDialog;
