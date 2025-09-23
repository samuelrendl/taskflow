import CreateTeamDialog from "./CreateTeamDialog";
import { useMe } from "@/hooks/useMe";
import { Team } from "@/lib/types";
import BaseDialog from "../BaseDialog";
import FinalTeamDialog from "./FinalTeamDialog";

const TeamDialog = () => {
  const me = useMe();

  return (
    <BaseDialog<Team> triggerText="Create a New Team">
      {({ step, setStep, stepData }) => (
        <>
          {step === "initial" && (
            <CreateTeamDialog
              setStep={setStep}
              organizationId={me.me?.organization?.id}
            />
          )}
          {step === "final" && (
            <FinalTeamDialog teamData={stepData || undefined} />
          )}
        </>
      )}
    </BaseDialog>
  );
};

export default TeamDialog;
