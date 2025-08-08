import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { updateOrganization } from "@/lib/store/meSlice";

const FinalDialog = ({ organizationData }) => {
  const dispatch = useDispatch();
  const organizationName = organizationData?.name;

  const handleClose = () => {
    if (organizationData) {
      dispatch(updateOrganization(organizationData));
    }
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Congratulation!</DialogTitle>
        <DialogDescription>
          {organizationName
            ? `You have successfully created ${organizationName}`
            : "You have successfully created an organization."}
        </DialogDescription>
      </DialogHeader>
      <div>
        <DialogClose asChild>
          <Button variant="outline" onClick={handleClose}>Close</Button>
        </DialogClose>
      </div>
    </>
  );
};

export default FinalDialog;
