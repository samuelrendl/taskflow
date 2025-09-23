import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Team } from "@/lib/types";
import { useDispatch } from "react-redux";
import { addTeam } from "@/lib/store/organizationSlice";

const FinalTeamDialog = ({teamData}: {teamData: Team | undefined}) => {
  const dispatch = useDispatch();
  const teamName = teamData?.name;

  const handleClose = () => {
    if (teamData) {
      dispatch(addTeam(teamData));
    }
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Congratulation!</DialogTitle>
        <DialogDescription>
          {teamName
            ? `You have successfully created ${teamName}`
            : "You have successfully created an team."}
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

export default FinalTeamDialog;
