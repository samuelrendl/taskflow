import InitialDialog from "./InitialDialog";
import CreateDialog from "./CreateDialog";
import JoinDialog from "./JoinDialog";
import FinalDialog from "./FinalDialog";
import { useMe } from "@/hooks/useMe";
import { Organization } from "@/lib/types";
import BaseDialog from "../BaseDialog";

const OrgDialog = ({ userHasOrg }: { userHasOrg: boolean }) => {
  const me = useMe();

  return (
    <BaseDialog<Organization>
      triggerText="Create or Join an Org"
      autoOpen={!userHasOrg}
    >
      {({ step, setStep, stepData }) => (
        <>
          {step === "initial" && <InitialDialog setStep={setStep} />}
          {step === "create" && (
            <CreateDialog setStep={setStep} ownerId={me.me!.id} />
          )}
          {step === "join" && <JoinDialog setStep={setStep} />}
          {step === "final" && (
            <FinalDialog organizationData={stepData || undefined} />
          )}
        </>
      )}
    </BaseDialog>
  );
};

export default OrgDialog;
