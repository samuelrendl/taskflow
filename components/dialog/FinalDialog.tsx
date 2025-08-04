import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FinalDialogProps } from "@/lib/types";

const FinalDialog = ({ organizationName }: FinalDialogProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Congratulation!</DialogTitle>
        <DialogDescription>
          Your {organizationName} organization is ready. You can now invite
          members or start creating tasks.
        </DialogDescription>
      </DialogHeader>
      <div>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>

      </div>
    </>
  );
};

export default FinalDialog;
